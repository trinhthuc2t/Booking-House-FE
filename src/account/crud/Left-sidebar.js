import React from 'react';
import {Link} from "react-router-dom";

const LeftSidebar = ({id}) => {
    return (
        <div className="col-2 border-right ">
            <aside className="left-sidebar " style={{height: '80vh'}}>
                <div>
                    <nav className="list-group row" data-simplebar="">
                        <ul id="sidebarnav">
                            <li className="list-group-item">
                                <Link to={`/profile/information`}>
                                                         <span>
                                                             <i className="fa-solid fa-user me-3"></i>
                                                            </span>
                                    <span className="hide-menu ">Thông tin cá nhân</span>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link to={`/profile/editProfile`}
                                      aria-expanded="false">
                                                        <span>
                                                          <i className="fa-solid fa-pen-to-square me-3"></i>
                                                        </span>
                                    <span className="hide-menu">Sửa thông tin cá nhân</span>
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link to={`/profile/changePassword`}
                                      aria-expanded="false">
                                                            <span>
                                                              <i className="fa-solid fa-rotate me-3"></i>
                                                            </span>
                                    <span className="hide-menu">Đổi mật khẩu</span>
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link to={`/profile/registerOwner`}
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
    );
};

export default LeftSidebar;