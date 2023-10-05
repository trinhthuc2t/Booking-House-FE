import React from 'react';
import {Link} from "react-router-dom";
import {BiUserCircle} from "react-icons/bi";
import {MdNotificationsActive} from "react-icons/md";
import {FaFacebookMessenger} from "react-icons/fa";
import './house.scss';

const Navbar = () => {
    return (
        <>
            {/*Navbar Start */}
            <div className="container nav-bar bg-transparent">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
                    <Link to={"/home"} className="navbar-brand d-flex align-items-center text-center">
                        <div className="icon p-2 me-2">
                            <img className="img-fluid" src="img/house/icon-deal.png" alt="Icon"
                                 style={{width: 30, height: 30}}/>
                        </div>
                        <h1 className="m-0" style={{color: "rgb(0,185,142)"}}>Makaan</h1>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto">

                            <div className="nav-item"><i className="bi bi-box-arrow-in-right"></i>Đăng nhập</div>

                            {/* Tài khoản */}
                            <div className="nav-item dropdown">
                                <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <span style={{fontSize: 25}}><BiUserCircle/></span><span>Tài khoản</span>
                                </button>

                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Trang cá nhân</a></li>
                                    <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
                                </ul>
                            </div>


                            {/* Facebook Messenger */}
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <span style={{fontSize: 25}}> <FaFacebookMessenger/></span>
                                </a>
                                <div className="dropdown-menu rounded-0 m-0 custom-dropdown">
                                    <a className="dropdown-item">Người gửi+ đã gửi tin nhắn cho b</a>
                                </div>
                            </div>


                            {/* Thông báo */}
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <span style={{fontSize: 25}}> <MdNotificationsActive/></span>
                                </a>
                                <div className="dropdown-menu rounded-0 m-0 custom-dropdown">
                                    <p className="dropdown-item">.......</p>

                                </div>
                            </div>

                        </div>
                    </div>
                </nav>
            </div>
            {/*Navbar End */}
        </>
    );
};

export default Navbar;