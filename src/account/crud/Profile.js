import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import accountService from "../AccountService";

import _ from 'lodash';


const Profile = () => {
    const {id} = useParams();
    const [account, setAccount] = useState({});
    useEffect(() => {
        getAccountById();
    }, []);
    const getAccountById = () => {

        accountService.getAccountById(id).then((response) => {
            setAccount(response)
        }).catch(function (err) {
            console.log(err);
        })
    }
    return (
        <div className="container-fluid">
            <div className=" rounded bg-white mb-5">
                {!_.isEmpty(account) &&
                    <div className="row">
                        <div className="col-2 border-right ">
                            <aside className="left-sidebar " style={{height: '80vh'}}>
                                <div>
                                    <nav className="list-group row" data-simplebar="">
                                        <ul id="sidebarnav">
                                            <li className="list-group-item">
                                                <Link to={`/profile/${id}`}>
                                                         <span>
                                                             <i className="fa-solid fa-user me-3"></i>
                                                            </span>
                                                    <span className="hide-menu ">Thông tin cá nhân</span>
                                                </Link>
                                            </li>

                                            <li className="list-group-item">
                                                <Link to={`/editProfile/${id}`}
                                                      aria-expanded="false">
                                                        <span>
                                                          <i className="fa-solid fa-pen-to-square me-3"></i>
                                                        </span>
                                                    <span className="hide-menu">Sửa thông tin cá nhân</span>
                                                </Link>
                                            </li>
                                            <li className="list-group-item">
                                                <Link to={`/changePassword/${id}`}
                                                      aria-expanded="false">
                                                            <span>
                                                              <i className="fa-solid fa-rotate me-3"></i>
                                                            </span>
                                                    <span className="hide-menu">Đổi mật khẩu</span>
                                                </Link>
                                            </li>
                                            <li className="list-group-item">
                                                <Link to={`/register-owner/${id}`}
                                                      aria-expanded="false">
                                                            <span>
                                                              <i className="fa-solid fa-chevron-up me-3"></i>
                                                            </span>
                                                    <span className="hide-menu">Đăng ký làm chủ nhà</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </aside>
                        </div>
                        <div className="col-md-3 mt-5 border-right row">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <img className="rounded-circle mt-5" width="250px" height="300px"
                                     src={account.avatar} alt="avatar" id="image" name="avatar"/>
                            </div>
                        </div>
                        <div className="col-md-7 mt-5 border-right">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Thông tin cá nhân</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label className="labels" htmlFor="firstname">Họ</label>
                                        <input type="text" className="form-control" id="firstname"
                                               placeholder="Nhập họ" value={account.firstname} name="firstname"
                                               readOnly={true}/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="labels" htmlFor="lastname">Tên</label>
                                        <input type="text" className="form-control" id="Nhập tên"
                                               placeholder="Enter Lastname" value={account.lastname} name="lastname"
                                               readOnly={true}/>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12 mb-3">
                                        <label className="labels" htmlFor="address">Địa chỉ</label>
                                        <input type="text" className="form-control" id="address"
                                               placeholder="Nhập địa chỉ" value={account.address} name="address"
                                               readOnly={true}/>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="labels" htmlFor="email">Email</label>
                                        <input type="text" className="form-control" id="email"
                                               placeholder="Nhập Email" value={account.email} name="email"
                                               readOnly={true}/>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="labels" htmlFor="phone">Số điện thoại</label>
                                        <input type="text" className="form-control" id="phone"
                                               placeholder="Nhập số điện thoại" value={account.phone} name="phone"
                                               readOnly={true}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;