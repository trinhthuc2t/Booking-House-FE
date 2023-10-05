import React from 'react';
import {Link} from "react-router-dom";
import HouseComponent from "./HouseComponent";
import {BiUserCircle} from "react-icons/bi";
import {MdNotificationsActive} from "react-icons/md";
import {FaFacebookMessenger} from "react-icons/fa";

const Navbar = () => {
    return (
        <>

            {/*Navbar Start */}
            <div className="container nav-bar bg-transparent">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
                    <Link to={"/"} element={<HouseComponent/>} href="index.html"
                          className="navbar-brand d-flex align-items-center text-center">
                        <div className="icon p-2 me-2">
                            <img className="img-fluid" src="img/house/icon-deal.png" alt="Icon"
                                 style={{width: 30, height: 30}}/>
                        </div>
                        <h1 className="m-0" style={{color: "rgb(0,185,142)"}}>Makaan</h1>
                    </Link>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto">


                            {/* Tài khoản */}
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <span style={{fontSize: 25}}><BiUserCircle/></span> <span>Tài khoản</span>
                                </a>
                                <div className="dropdown-menu rounded-0 m-0 custom-dropdown">
                                    <a href="testimonial.html" className="dropdown-item">Đăng kí</a>
                                    <a href="404.html" className="dropdown-item">Đăng nhập</a>
                                </div>
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