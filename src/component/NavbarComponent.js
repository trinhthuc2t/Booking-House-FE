
import './house.scss';
import icon_house from '../image/icons8-house-60.png';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="container-fluid nav-bar py-2 mb-5 sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light py-0 px-4">
                <Link to={"/home"} className="navbar-brand d-flex align-items-center text-center">
                    <div className="me-1">
                        <img className="img-fluid" src={icon_house} alt="Icon"/>
                    </div>
                    <h2 style={{color: "rgb(0,185,142)"}}>Thuê nhà</h2>
                </Link>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ms-auto navbar-custom">
                        <Link to="/login" className="nav-item nav-link">
                            <i className="bi bi-box-arrow-in-right me-2"></i>Đăng nhập
                        </Link>

                        {/* Tài khoản */}
                        <div className="nav-item dropdown">
                            <button className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                                <i className="bi bi-person-circle me-2"></i>Tài khoản
                            </button>

                            <ul className="dropdown-menu">
                                <li className="p-2">
                                    <Link to="/profile" className="dropdown-item nav-link">
                                        <i className="bi bi-person-bounding-box me-2"></i>Trang cá nhân
                                    </Link>
                                </li>
                                <li className="p-2">
                                    <Link to="/logout" className="dropdown-item nav-link">
                                        <i className="bi bi-box-arrow-in-right me-2"></i>Đăng xuất
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Facebook Messenger */}
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                <i className="bi bi-messenger"></i>
                            </a>
                            <div className="dropdown-menu rounded-0 m-0 custom-dropdown">
                                <a className="dropdown-item">Người gửi+ đã gửi tin nhắn cho b</a>
                            </div>
                        </div>


                        {/* Thông báo */}
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                <i className="bi bi-bell-fill"></i>
                            </a>
                            <div className="dropdown-menu rounded-0 m-0 custom-dropdown">
                                <p className="dropdown-item">.......</p>

                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;