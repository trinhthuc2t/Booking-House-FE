import React, {useContext, useEffect, useState} from 'react';
import _ from "lodash";
import {Table} from "reactstrap";
import AccountService from "../../../service/AccountService";
import {Pagination} from "@mui/material";
import Swal from "sweetalert2";
import bookingService from "../../../service/BookingService";
import {Button, Modal} from "react-bootstrap";
import {formatCurrency} from "../../../service/format";
import {Link} from "react-router-dom";
import {WebSocketContext} from "../../ChatBox/WebSocketProvider";

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [nameSearch, setNameSearch] = useState("");
    const [isLoad, setIsLoad] = useState(false);
    const roleName = "ROLE_USER";
    const [user , setUser] = useState({});
    const [bookingList , setBookingList] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [totalPagesMd, setTotalPagesMd] = useState(0);
    const [currentPageMd, setCurrentPageMd] = useState(1);
    const [spending , setSpending] = useState(0);
    const {blockAccountSocket} = useContext(WebSocketContext);
    const [status, setStatus] = useState("");
    const findByRoleName = (roleName, nameSearch , status, currentPage) => {
        AccountService.findUser(roleName, nameSearch , status, currentPage)
            .then((accounts) => {
                setUserList(accounts.data.content);
                setTotalPages(accounts.data.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        findByRoleName(roleName, nameSearch , status, currentPage - 1);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, nameSearch , isLoad , status])

    const changePage = (e, value) => {
        setCurrentPage(value)
    }
    const handleNameSearch = (event) => {
        const nameSearch = event.target.value;
        setNameSearch(nameSearch);
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

    const showUserDetail = (user) => {
        setUser(user);
        getListBooking(user.id);
        getSpending(user.id);
    }
    useEffect(() => {
        getListBooking(user.id);
    },[currentPageMd])
    const getListBooking = (id) => {
        let booking = {
            houseName : '',
            status : '',
            startTime : '' ,
            endTime : ''
        };
        bookingService.getHistoryByAccount(id , currentPageMd - 1 , booking).then((response) => {
            setBookingList(response.data.content);
            setTotalPagesMd(response.data.totalPages);
            setLgShow(true);
        }).catch(function (err) {
            console.log(err)
        })
    }

    const getSpending = (id) => {
       bookingService.getSpending(id).then((response) => {
           console.log(response.data);
            if (response.data) {
                setSpending(response.data.spending);
            }else {
                setSpending(0);
            }


       }).catch(function (err) {
           console.log(err);
       })
    }
    const changePageMd = (e, value) => {
        setCurrentPageMd(value);
    }
    const handleOptionChange = (e) => {
        setStatus(e.target.value);
    }


    return (
        <div className="col-9">
            <h3 className="text-uppercase text-center mb-5">Danh sách người dùng</h3>
            <div className="mb-3 py-4 px-3"
                 style={{backgroundColor: "rgb(0,185,142)"}}>
               <div className={'row g-2'}>
                   <div  className="col-md-4">
                       <select className="form-select py-2 border-0"
                               onChange={handleOptionChange}>
                           <option value="">Tất cả</option>
                           <option value="Bị khóa">Bị khóa</option>
                           <option value="Đang hoạt động">Đang hoạt động</option>
                       </select>
                   </div>
                   <div className="col-md-8">
                       <input type="text" className="form-control border-0 py-2"
                              placeholder="Nhập từ khóa tìm kiếm"
                              name=""
                              id="" onChange={handleNameSearch}/>
                   < /div>
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
                {!_.isEmpty(userList) ?
                    userList.map((user, index) => {
                        return (
                            <tr key={index} align="center">
                                <td>{index + 1}</td>
                                <td>{`${user.lastname} ${user.firstname}`}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.status}</td>
                                <td className="d-flex justify-content-center">
                                    <button
                                        onClick={() => {
                                            showUserDetail(user)
                                        }}
                                        className="btn border border-primary text-primary me-3"
                                        style={{width: '100px'}}>
                                        Chi tiết
                                    </button>
                                    {user.status === "Bị khóa" ?
                                        <button
                                            onClick={() => handleUnBlockAccount(user.id)}
                                            className="btn border border-danger text-danger"
                                            style={{width: '100px'}}>
                                            Mở khóa
                                        </button>
                                    :
                                        <button
                                            onClick={() => handleBlockAccount(user.id)}
                                            className="btn border border-secondary text-secondary"
                                            style={{width: '100px'}}>
                                            Khóa
                                        </button>}
                                </td>
                            </tr>
                        )
                    }) :
                    <tr align="center">
                        <td colSpan="6" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                    </tr>
                }
                </tbody>
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
                                <img src={user.avatar} alt="Chưa có avatar" height={200} width={200}/>
                            </div>
                            <div className="col-7">
                                <Table hover>
                                    <tr>
                                        <th>Tên tài khoản:</th>
                                        <td>{user.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Họ và tên:</th>
                                        <td>{user.lastname} {user.firstname}</td>
                                    </tr>
                                    <tr>
                                        <th>Email:</th>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Địa chỉ:</th>
                                        <td>{user.address}, {user.ward}, {user.district}, {user.province}</td>
                                    </tr>
                                    <tr>
                                        <th>Số điện thoại:</th>
                                        <td>{user.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Trạng thái:</th>
                                        <td>{user.status}</td>
                                    </tr>
                                    <tr>
                                        <th>Số tiền đã chi tiêu</th>
                                        <td>{formatCurrency(spending)}</td>
                                    </tr>
                                </Table>
                            </div>
                            <div className="row">
                                <h2 className="text-md-center">Lịch sử thuê nhà</h2>
                                <Table hover>
                                    <thead>
                                    <tr align="center" style={{fontSize: '20px'}}>
                                        <th>STT</th>
                                        <th>Tên nhà</th>
                                        <th>Địa chỉ</th>
                                        <th>Trạng thái</th>
                                        <th>Giá thuê</th>
                                        <th>Tổng chi phí</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {!_.isEmpty(bookingList) ?
                                        bookingList.map((h, index) => {
                                            return (
                                                <tr key={index} align="center">
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        <Link to={`/house-detail/${h.id}`} className="nav-link">
                                                            <h5>{h.house?.name}</h5>
                                                        </Link>
                                                    </td>
                                                    <td>{h.house?.province}</td>
                                                    <td>{h.status}</td>
                                                    <td>{formatCurrency(h.house?.price)}</td>
                                                    <td>{formatCurrency(h.total)}</td>
                                                </tr>
                                            )
                                        }) :
                                        <tr align="center">
                                            <td colSpan="6" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                                        </tr>

                                    }

                                    </tbody>
                                </Table>
                                {!_.isEmpty(bookingList) ?
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
            </Table>
            {!_.isEmpty(userList) ?
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

export default UserList;