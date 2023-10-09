import React from 'react';
import {Link, NavLink} from "react-router-dom";

const LeftSidebar = ({id}) => {
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
                                    <span className="hide-menu ">Thông tin cá nhân</span>
                                </NavLink>
                            </li>

                            <li className="px-3 py-2">
                                <NavLink to="/profile/edit-profile"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-pen-to-square me-3"></i>
                                    <span className="hide-menu">Sửa thông tin cá nhân</span>
                                </NavLink>
                            </li>
                            <li className="px-3 py-2">
                                <NavLink to="/profile/change-password"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-rotate me-3"></i>
                                    <span className="hide-menu">Đổi mật khẩu</span>
                                </NavLink>
                            </li>
                            <li className="px-3 py-2">
                                <NavLink to="/profile/register-owner"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-chevron-up me-3"></i>
                                    <span className="hide-menu">Đăng ký làm chủ nhà</span>
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