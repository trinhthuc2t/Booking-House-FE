import React, {useEffect, useState} from 'react';
import AccountService from "../../../service/AccountService";
import {Table} from "reactstrap";
import _ from "lodash";
import {Pagination} from "@mui/material";
import Swal from "sweetalert2";
import {Button, Modal} from "react-bootstrap";
import BookingService from "../../../service/BookingService";
import {Link} from "react-router-dom";
import {convertDateFormat,  formatCurrency} from "../../../service/format";


const ListAccount = () => {
    const [accounts, setAccounts] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [totalBooking, setTotalBooking] = useState([]);
    const [account, setAccount] = useState({});
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [roleName, setRoleName] = useState("ALL");
    const [nameSearch, setNameSearch] = useState("");
    const [isLoad, setIsLoad] = useState(false);
    const [lgShow, setLgShow] = useState(false);

    const changePage = (e, value) => {
        setCurrentPage(value)
    }
    const handleOptionChange = (event) => {
        const optionValue = event.target.value;
        setRoleName(optionValue);
    };
    const handleNameSearch = (event) => {
        const nameSearch = event.target.value;
        setNameSearch(nameSearch);
    };

    const findByRoleName = (roleName, nameSearch, currentPage) => {
        AccountService.findByRoleName(roleName, nameSearch, currentPage)
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
        findByAccountId(acc.id);
    }
    const findByAccountId = (accountId) => {
        BookingService.getHistoryByAccount(accountId )
            .then((bookings) => {
                setBookings(bookings.data.content)
                setTotalBooking(totalBookingByAcc(bookings.data.content));
                setLgShow(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const totalBookingByAcc = (bookings) => {
        let totalBooking = 0;
        for (let i = 0; i < bookings.length; i++) {
            totalBooking += bookings[i].total;
        }
        return totalBooking;
    };

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
                        })
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
        findByRoleName(roleName, nameSearch, currentPage - 1);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, nameSearch, roleName, isLoad])

    const checkStatusAccount = (acc) => {
        if (acc.role.name !== "ROLE_ADMIN") {
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

        } else {
            return (
                <button
                    // onClick={() => handleBlockAccount(acc.id)}
                    className="btn border border-warning text-bg-warning"
                    style={{width: '100px'}}>
                    Admin
                </button>
            )
        }
    }

    return (

        <div className="col-9">
            <h3 className="text-uppercase text-center mb-5">Danh sách người dùng</h3>
            <div className="mb-3 py-4 px-3"
                 style={{backgroundColor: "rgb(0,185,142)"}}>
                <div className="row g-2">
                    <div className="col-md-4">
                        <select className="form-select py-2 border-0"
                                onChange={handleOptionChange}>
                            <option value="ALL">Tất cả</option>
                            <option value="ROLE_ADMIN">Admin</option>
                            <option value="ROLE_OWNER">Chủ nhà</option>
                            <option value="ROLE_USER">Người dùng</option>
                        </select>
                    </div>

                    <div className="col-md-8">
                        <input type="text" className="form-control border-0 py-2"
                               placeholder="Nhập từ khóa tìm kiếm"
                               name=""
                               id="" value={nameSearch} onInput={handleNameSearch}/>
                    < /div>

                </div>
            </div>

            <Table hover>
                <thead>
                <tr align="center">
                    <th>STT</th>
                    <th>Tài khoản</th>
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
                                <td>{acc.username}</td>
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
                                    <td>{account.address}</td>
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
                                    <th>Số tiền đã tiêu:</th>
                                    <td>{formatCurrency(totalBooking)}</td>
                                </tr>
                            </Table>
                        </div>
                        <div className="row">
                            <h2 className="text-md-center">Lịch sử thuê nhà</h2>
                            <Table hover>
                                <thead>
                                <tr align="center" style={{fontSize: '20px'}}>
                                    <th>STT</th>
                                    <th>Căn nhà</th>
                                    <th>Ngày thuê</th>
                                    <th>Ngày trả</th>
                                    <th>Tổng tiền</th>
                                </tr>
                                </thead>
                                <tbody>
                                {!_.isEmpty(bookings) ?
                                    bookings.map((b, index) => {
                                        console.log(bookings)
                                        return (
                                            <tr key={b.id} align="center">
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <Link to={`/house-detail/${b.id}`} className="nav-link">
                                                        <h5>{b.house.name}</h5>
                                                    </Link>
                                                </td>

                                                <td className="mb-3">
                                                    {convertDateFormat(b.startTime)}
                                                </td>
                                                <td className="mb-3">
                                                    {convertDateFormat(b.endTime)}
                                                </td>
                                                <td className="mb-3">
                                                    {formatCurrency(b.total)}
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
                            {!_.isEmpty(accounts) ?
                                <div className="col-12 mt-3 d-flex justify-content-center">
                                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                                onChange={changePage} color="primary"/>
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

export default ListAccount;