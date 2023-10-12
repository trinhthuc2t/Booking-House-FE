import React from 'react';
import {NavLink} from "react-router-dom";

const LeftSidebar = () => {
    return (
        <div className="col-3 bg-light border-end py-3">
            <aside className="left-sidebar" style={{height: '80vh'}}>
                <div>
                    <nav className="list-group row">
                        <ul id="sidebarnav">
                            <li className="px-3 py-2">
                                <NavLink to="/profile/information"
                                      className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-user me-3"></i>
                                    Thông tin cá nhân
                                </NavLink>
                            </li>

                            <li className="px-3 py-2">
                                <NavLink to="/profile/edit-profile"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-pen-to-square me-3"></i>
                                    Sửa thông tin cá nhân
                                </NavLink>
                            </li>
                            <li className="px-3 py-2">
                                <NavLink to="/profile/change-password"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-rotate me-3"></i>
                                    Đổi mật khẩu
                                </NavLink>
                            </li>
                            <li className="px-3 py-2">
                                <NavLink to="/profile/register-owner"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-house-user me-3"></i>
                                    Đăng ký làm chủ nhà
                                </NavLink>
                            </li>
                            <li className="px-3 py-2">
                                <NavLink to="/profile/houses-owner"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-list-check me-3"></i>
                                    Quản lý nhà cho thuê
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default LeftSidebar;