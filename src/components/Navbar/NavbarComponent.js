import './navbar.scss';
import icon_house from '../../image/icons8-house-60.png';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {deleteAccount} from "../../redux/actions";
import icon_user from '../../image/icons8-user-50.png';

const Navbar = () => {
    const account = useSelector((state) => state.account);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("account");
        dispatch(deleteAccount());
    }
    return (
        <div className="container-fluid nav-bar py-2 mb-5 sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light py-0 px-4">
                <Link to={"/"} className="navbar-brand d-flex align-items-center text-center">
                    <div className="me-1">
                        <img className="img-fluid" src={icon_house} alt="Icon"/>
                    </div>
                    <h2 style={{color: "rgb(0,185,142)"}}>LUXURY</h2>
                </Link>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ms-auto navbar-custom">
                        {_.isEmpty(account) ?
                            <Link to="/login" className="nav-item nav-link">
                                <i className="bi bi-box-arrow-in-right me-2"></i>Đăng nhập
                            </Link>
                            :
                            <div className="d-flex align-items-center">
                                <div className="nav-item dropdown">
                                    <button className="dropdown-toggle nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img className="img-thumbnail rounded-circle me-2" src={account.avatar ? account.avatar : icon_user} alt=""
                                             width={40} style={{height: '40px'}}/>
                                        {account.username}
                                    </button>

                                    <ul className="dropdown-menu">
                                        <li className="p-1">
                                            <Link to="/profile/information" className="dropdown-item nav-link">
                                                <i className="bi bi-person-bounding-box me-2"></i>Trang cá nhân
                                            </Link>
                                        </li>
                                        <li className="p-1">
                                            <Link to="/" className="dropdown-item nav-link" onClick={handleLogout}>
                                                <i className="bi bi-power me-2"></i>Đăng xuất
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="nav-item dropdown">
                                    <Link to="/chat" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                        <i className="bi bi-messenger"></i>
                                    </Link>
                                    <div className="dropdown-menu rounded-0 m-0 custom-dropdown">
                                        <a className="dropdown-item">Người gửi+ đã gửi tin nhắn cho b</a>
                                    </div>
                                </div>


                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                        <i className="bi bi-bell-fill"></i>
                                    </a>
                                    <div className="dropdown-menu rounded-0 m-0 custom-dropdown">
                                        <p className="dropdown-item">.......</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;