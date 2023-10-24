import React, {useContext, useEffect, useState} from 'react';
import AccountService from "../../../service/AccountService";
import {Table} from "reactstrap";
import _ from "lodash";
import {Pagination} from "@mui/material";
import Swal from "sweetalert2";
import {Button, Modal} from "react-bootstrap";
import {formatCurrency} from "../../../service/format";
import HouseByIdService from "../../../service/HouseByIdService";
import {Link} from "react-router-dom";
import houseByIdService from "../../../service/HouseByIdService";
import {WebSocketContext} from "../../ChatBox/WebSocketProvider";


const ListOwner = () => {
    const [accounts, setAccounts] = useState([]);
    const [houses, setHouses] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [account, setAccount] = useState({});
    const [totalPages, setTotalPages] = useState(0);
    const [totalPagesMd, setTotalPagesMd] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageMd, setCurrentPageMd] = useState(1);
    const [status, setStatus] = useState("ALL");
    const [nameSearch, setNameSearch] = useState("");
    const [isLoad, setIsLoad] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const roleName = "ROLE_OWNER";

    const {blockAccountSocket} = useContext(WebSocketContext);
    const changePage = (e, value) => {
        setCurrentPage(value)
    }
    const changePageMd = (e, value) => {
        setCurrentPageMd(value)
    }
    const handleOptionChange = (event) => {
        const optionValue = event.target.value;
        setStatus(optionValue);
    };
    const handleNameSearch = (event) => {
        const nameSearch = event.target.value;
        setNameSearch(nameSearch);
    };

    const findByRoleName = (roleName, nameSearch, status, currentPage) => {
        AccountService.findByRoleName(roleName, nameSearch, status, currentPage)
            .then((accounts) => {
                setAccounts(accounts.data.content);
                setTotalPages(accounts.data.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const accountDetail = (acc) => {
        setAccount(acc);
        getHousesByAccountId(acc.id);
        calculateRevenue(acc.id);
    }
    const getHousesByAccountId = (ownerId) => {
        HouseByIdService.findByOwnerId(ownerId , currentPageMd - 1)
            .then((houses) => {
                console.log(houses.content);
                setHouses(houses.content);
                setTotalPagesMd(houses.totalPages)
                setLgShow(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getRevenue = (house) => {
        let revenue = 0;
        for (let i = 0; i < house.length; i++) {
            revenue += house[i].revenue;
        }
        return revenue;
    };

    const calculateRevenue = (id) => {
        houseByIdService.getRevenueByOwnerId(id).then((response) => {
            setRevenue(getRevenue(response.data));
        }).catch(function (err) {
            console.log(err);
        })
    }

    const handleBlockAccount = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn khóa tài khoản này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                AccountService.blockAccount(id)
                    .then((res) => {
                        setIsLoad(!isLoad);
                        Swal.fire({
                            icon: 'success',
                            title: 'Khóa thành công !',
                            showConfirmButton: false,
                            timer: 1000
                        }).then();
                        blockAccountSocket(id);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        })
    }
    const handleUnBlockAccount = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn mở khóa tài khoản này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                AccountService.unblockAccount(id)
                    .then((res) => {
                        setIsLoad(!isLoad);
                        Swal.fire({
                            icon: 'success',
                            title: 'Mở khóa thành công !',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        })
    }

    useEffect(() => {
        findByRoleName(roleName, nameSearch, status, currentPage - 1);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, currentPageMd, nameSearch, revenue, houses, status, isLoad])
    useEffect(() => {
            getHousesByAccountId(account.id , currentPageMd );
    },[currentPageMd])
    const checkStatusAccount = (acc) => {
        if (acc.status === "Bị khóa") {
            return (
                <button
                    onClick={() => handleUnBlockAccount(acc.id)}
                    className="btn border border-danger text-danger"
                    style={{width: '100px'}}>
                    Mở khóa
                </button>
            )
        } else {
            return (
                <button
                    onClick={() => handleBlockAccount(acc.id)}
                    className="btn border border-secondary text-secondary"
                    style={{width: '100px'}}>
                    Khóa
                </button>
            )
        }
    }

    return (
        <div className="col-9">
            <h3 className="text-uppercase text-center mb-5">Danh sách chủ nhà</h3>
            <div className="mb-3 py-4 px-3"
                 style={{backgroundColor: "rgb(0,185,142)"}}>
                <div className="row g-2">
                    <div className="col-md-4">
                        <select className="form-select py-2 border-0"
                                onChange={handleOptionChange}>
                            <option value="ALL">Tất cả</option>
                            <option value="Bị khóa">Bị khóa</option>
                            <option value="Đang hoạt động">Đang hoạt động</option>
                        </select>
                    </div>

                    <div className="col-md-8">
                        <input type="text" className="form-control border-0 py-2"
                               placeholder="Nhập từ khóa tìm kiếm"
                               name=""
                               id="" value={nameSearch} onInput={handleNameSearch}/>
                    </div>
                </div>
            </div>

            <Table hover>
                <thead>
                <tr align="center">
                    <th>STT</th>
                    <th>Họ và tên</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody style={{verticalAlign: 'middle'}}>
                {!_.isEmpty(accounts) ?
                    accounts.map((acc, index) => {
                        return (
                            <tr key={index} align="center">
                                <td>{index + 1}</td>
                                <td>{acc.lastname} {acc.firstname}</td>
                                <td>{acc.phone}</td>
                                <td>{acc.email}</td>
                                <td>{acc.status}</td>
                                <td className="d-flex justify-content-center">
                                    <button
                                        onClick={() => accountDetail(acc)}
                                        className="btn border border-primary text-primary me-3"
                                        style={{width: '100px'}}>
                                        Chi tiết
                                    </button>
                                    {checkStatusAccount(acc)}
                                </td>
                            </tr>
                        )
                    }) :
                    <tr align="center">
                        <td colSpan="6" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                    </tr>
                }

                </tbody>
            </Table>

            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Chi tiết người dùng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-4">
                            <img src={account.avatar} alt="Chưa có avatar" height={200} width={200}/>
                        </div>
                        <div className="col-7">
                            <Table hover>
                                <tr>
                                    <th>Tên tài khoản:</th>
                                    <td>{account.username}</td>
                                </tr>
                                <tr>
                                    <th>Họ và tên:</th>
                                    <td>{account.lastname} {account.firstname}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{account.email}</td>
                                </tr>
                                <tr>
                                    <th>Địa chỉ:</th>
                                    <td>{account.address} {account.ward} {account.district} {account.province}</td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại:</th>
                                    <td>{account.phone}</td>
                                </tr>
                                <tr>
                                    <th>Trạng thái:</th>
                                    <td>{account.status}</td>
                                </tr>
                                <tr>
                                    <th>Tổng doanh thu</th>
                                    <td>{formatCurrency(revenue)}</td>
                                </tr>
                            </Table>
                        </div>
                        <div className="row">
                            <h2 className="text-md-center">Danh sách nhà</h2>
                            <Table hover>
                                <thead>
                                <tr align="center" style={{fontSize: '20px'}}>
                                    <th>STT</th>
                                    <th>Căn nhà</th>
                                    <th>Địa chỉ</th>
                                    <th>Giá thuê</th>
                                    <th>Doanh thu</th>
                                </tr>
                                </thead>
                                <tbody>
                                {!_.isEmpty(houses) ?
                                    houses.map((h, index) => {
                                        return (
                                            <tr key={index} align="center">
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <Link to={`/house-detail/${h.id}`} className="nav-link">
                                                        <h5>{h.name}</h5>
                                                    </Link>
                                                </td>
                                                <td>{h.province}</td>
                                                <td>{formatCurrency(h.price)}</td>
                                                <td>{formatCurrency(h.revenue)}</td>
                                            </tr>
                                        )
                                    }) :
                                    <tr align="center">
                                        <td colSpan="6" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                                    </tr>

                                }

                                </tbody>
                            </Table>
                            {!_.isEmpty(houses) ?
                                <div className="col-12 mt-3 d-flex justify-content-center">
                                    <Pagination count={totalPagesMd} size="large" variant="outlined" shape="rounded"
                                                onChange={changePageMd} color="primary"/>
                                </div>
                                :
                                null
                            }

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="py-2 px-3"
                            onClick={() => setLgShow(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            {!_.isEmpty(accounts) ?
                <div className="col-12 mt-5 d-flex justify-content-center">
                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                onChange={changePage} color="primary"/>
                </div>
                :
                null
            }
        </div>
    );
};

export default ListOwner;