import './navbar.scss';
import icon_house from '../../image/icons8-house-60.png';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {countUnreadMessage, countUnreadNotify, deleteAccount, getAllNotify} from "../../redux/actions";
import icon_user from '../../image/icons8-user-50.png';
import {useEffect} from "react";
import {countUnreadMessagesByReceiverId} from "../../service/messageService";
import {
    changeStatusNotify,
    countUnreadNotifyByAccountLogin,
    getAllNotifyByAccountLogin
} from "../../service/notifyService";
import image_default from '../../image/user-image.png';
import {format} from "date-fns";

const Navbar = () => {
    const {account, unreadMessage, unreadNotify, notifyList} = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!_.isEmpty(account)) {
            countUnreadMessagesByReceiverId(account.id).then(response => {
                dispatch(countUnreadMessage(response.data));
            }).catch(error => {
                console.log(error);
            })

            countUnreadNotifyByAccountLogin(account.id).then(response => {
                dispatch(countUnreadNotify(response.data));
            }).catch(error => {
                console.log(error);
            })
        }
    }, [])

    useEffect(() => {
        if (!_.isEmpty(account)) {
            getAllNotifyByAccountLogin(account.id).then(response => {
                dispatch(getAllNotify(response.data));
            }).catch(error => {
                console.log(error);
            })
        }
    }, [unreadNotify])

    const handleLogout = () => {
        localStorage.removeItem("account");
        dispatch(deleteAccount());
    }
    
    const handleChangeStatusNotify = () => {
        changeStatusNotify(account.id).then(response => {
            dispatch(countUnreadNotify(0));
        }).catch(error => {
            console.log(error)
        })
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
                                    <button className="dropdown-toggle nav-link" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        <img className="img-thumbnail rounded-circle me-2"
                                             src={account.avatar ? account.avatar : icon_user} alt=""
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

                                <div className="nav-item">
                                    <Link to="/chat" className="nav-link position-relative">
                                        <i className="bi bi-messenger"></i>
                                        {unreadMessage ?
                                            <sup className="badge text-white bg-danger position-absolute top-0 start-50"
                                                 style={{fontSize: '10px'}}>
                                                {unreadMessage > 5 ? '5+' : unreadMessage}
                                            </sup>
                                            :
                                            null
                                        }
                                    </Link>
                                </div>


                                <div className="nav-item dropdown">
                                    <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                            onClick={handleChangeStatusNotify}>
                                        <i className="bi bi-bell-fill"></i>
                                        {unreadNotify ?
                                            <sup className="badge text-white bg-danger position-absolute top-0 start-50"
                                                 style={{fontSize: '10px'}}>
                                                {unreadNotify > 5 ? '5+' : unreadNotify}
                                            </sup>
                                            :
                                            null
                                        }
                                    </button>
                                    <div className="dropdown-menu dropdown-notify">
                                        {!_.isEmpty(notifyList) && notifyList.map(item => (
                                            <Link to={`/${item.navigate}`} className="d-flex align-items-center py-2 px-3 dropdown-notify-item"
                                                 key={item.id}>
                                                <img className="img-thumbnail rounded-circle"
                                                     src={item.sender.avatar ? item.sender.avatar : image_default}
                                                     alt="" width={50}
                                                     style={{height: '50px'}}/>
                                                <div className="d-flex flex-column ms-3">
                                                    <p className="mb-2 message-title">
                                                        {item.message}
                                                    </p>
                                                    <small className="fst-italic" style={{fontSize: '12px'}}>
                                                        <i className="bi bi-clock me-1"></i>{format(new Date(item.createAt), "dd/MM/yyyy")}
                                                    </small>
                                                </div>
                                            </Link>
                                        ))}
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