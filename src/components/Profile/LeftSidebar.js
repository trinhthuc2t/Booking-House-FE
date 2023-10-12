import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const LeftSidebar = ({id}) => {

    const account = useSelector(state => state.account);

    const checkRole = () => {
         if (account.role.id === 2) {
             return(
                 <div className={"col"}>
                     <li className="px-3 py-2">
                         <NavLink to="/profile/confirm-owner"
                                  className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                             <i className="fa-solid fa-chevron-up me-3"></i>
                             <span className="hide-menu">Danh sách đăng ký làm chủ nhà</span>
                         </NavLink>
                     </li>
                     <li className="px-3 py-2">
                         <NavLink to="/"
                                  className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                             <i className="fa-solid fa-list me-3"></i>
                             <span className="hide-menu">Danh sách chủ nhà</span>
                         </NavLink>
                     </li>
                 </div>
             )
         }else if (account.role.id === 1){
             return  <div>
                 <li className="px-3 py-2">
                     <NavLink to="/profile/register-owner"
                              className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                         <i className="fa-solid fa-chevron-up me-3"></i>
                         <span className="hide-menu">Đăng ký làm chủ nhà</span>
                     </NavLink>
                 </li>
             </div>
         }

    }
    const listBill = () => {
        return (
            <div>
                <li className="px-3 py-2">
                    <NavLink to="/profile/rental-history"
                             className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                        <i className="fa-solid fa-bars me-3"></i>
                        <span className="hide-menu">Lịch sử thuê nhà</span>
                    </NavLink>
                </li>
            </div>
        )
    }

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
                            {checkRole()}
                            {listBill()}

                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default LeftSidebar;