import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const LeftSidebar = () => {

    const account = useSelector(state => state.account);

    const checkRole = () => {
        if (account.role.name === "ROLE_ADMIN") {
            return (
                <>
                    <li className="px-3 py-2">
                        <NavLink to="/profile/confirm-owner"
                                 className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fa-solid fa-address-book me-3"></i>
                            Danh sách đăng ký làm chủ nhà
                        </NavLink>
                    </li>
                    <li className="px-3 py-2">
                        <NavLink to="/profile/list-owner"
                                 className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fa-solid fa-list me-3"></i>
                            Danh sách chủ nhà
                        </NavLink>
                    </li>
                    <li className="px-3 py-2">
                        <NavLink to="/profile/list-user"
                                 className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fa-solid fa-list me-3"></i>
                            Danh sách người dùng
                        </NavLink>
                    </li>
                </>
            )
        } else if (account.role.name === "ROLE_USER") {
            return (
                <li className="px-3 py-2">
                    <NavLink to="/profile/register-owner"
                             className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                        <i className="fa-solid fa-house-user me-3"></i>
                        Đăng ký làm chủ nhà
                    </NavLink>
                </li>
            )
        } else {
            return (
                <>
                    <li className="px-3 py-2">
                        <NavLink to="/profile/houses-owner-booking"
                                 className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fa-solid fa-list-check me-3"></i>
                            Lịch sử cho thuê nhà
                        </NavLink>
                    </li>
                    <li className="px-3 py-2">
                        <NavLink to="/profile/houses-owner"
                                 className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fa-solid fa-people-roof me-3"></i>
                            Quản lý nhà cho thuê
                        </NavLink>
                    </li>
                    <li className="px-3 py-2">
                        <NavLink to="/profile/houses-owner-revenue"
                                 className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fa-solid fa-chart-line me-3"></i>
                            Doanh thu
                        </NavLink>
                    </li>
                </>
            )
        }

    }

    return (
        <div
            className={`col-3 border-end py-3 ${account.role.name === "ROLE_ADMIN" ? 'bg-admin' :
                account.role.name === "ROLE_OWNER" ?  'bg-owner' : 'bg-light' }`}>
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
                                <NavLink to="/profile/rental-history"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-rectangle-list me-3"></i>
                                    <span className="hide-menu">Lịch sử thuê nhà</span>
                                </NavLink>
                            </li>
                            {checkRole()}
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default LeftSidebar;