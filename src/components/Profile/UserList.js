import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {Table} from "reactstrap";
import AccountService from "../../service/AccountService";
import {Pagination} from "@mui/material";
import Swal from "sweetalert2";

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [nameSearch, setNameSearch] = useState("");
    const [isLoad, setIsLoad] = useState(false);
    const roleName = "ROLE_USER";

    const findByRoleName = (roleName, nameSearch, currentPage) => {
        AccountService.findUser(roleName, nameSearch, currentPage)
            .then((accounts) => {
                console.log('get list user');
                console.log(accounts.data)
                setUserList(accounts.data.content);
                setTotalPages(accounts.data.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        findByRoleName(roleName, nameSearch, currentPage - 1);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, nameSearch , isLoad])

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

    return (
        <div className="col-9">
            <h3 className="text-uppercase text-center mb-5">Danh sách người dùng</h3>
            <div className="mb-3 py-4 px-3"
                 style={{backgroundColor: "rgb(0,185,142)"}}>
                    <div className="col-md-12">
                        <input type="text" className="form-control border-0 py-2"
                               placeholder="Nhập từ khóa tìm kiếm"
                               name=""
                               id="" onChange={handleNameSearch}/>
                    < /div>
            </div>
            <Table hover>
                <thead>
                <tr align="center">
                    <th>STT</th>
                    <th>Họ và tên</th>
                    <th>Số điện thoại</th>
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
                                <td>{`${user.firstname} ${user.lastname}`}</td>
                                <td>{user.phone}</td>
                                <td>{user.status}</td>
                                <td className="d-flex justify-content-center">
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