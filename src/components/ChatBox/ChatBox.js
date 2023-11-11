import React, {useContext, useEffect, useRef, useState} from 'react';
import './chatbox.scss';
import AccountService from "../../service/AccountService";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {
    changeStatusMessage, countUnreadMessagesByReceiverId,
    getAllMessagesBySenderIdAndReceiverId, saveMessage
} from "../../service/messageService";
import {formatDateTimeMessage} from "../../service/format";
import {WebSocketContext} from "./WebSocketProvider";
import {countUnreadMessage} from "../../redux/actions";
import image_default from '../../image/user-image.png';

const ChatBox = () => {
        const [usersAndUnreadMessage, setUsersAndUnreadMessage] = useState([]);
        const [messages, setMessages] = useState([]);
        const [message, setMessage] = useState("");
        const [search, setSearch] = useState("");
        const [usersSearch, setUsersSearch] = useState([]);
        const account = useSelector(state => state.account);
        const [selectedAccount, setSelectedAccount] = useState({});
        const [render, setRender] = useState(true);
        const chatRef = useRef(null);
        const dispatch = useDispatch();

        const {sendMessage, messageReceiver} = useContext(WebSocketContext);
        const {unreadMessage} = useSelector(state => state.unreadMessage);

        useEffect(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }, [])

        useEffect(() => {
            AccountService.searchUsersMessage(account.id, search).then(response => {
                setUsersSearch(response.data);
            })
        }, [search])

        useEffect(() => {
            AccountService.listUserAndUnreadMessage(account.id).then(response => {
                setUsersAndUnreadMessage(response.data);
            }).catch(error => {
                console.log(error);
            })

            if (selectedAccount.id) {
                getAllMessagesBySenderIdAndReceiverId(account.id, selectedAccount.id)
                    .then(response => {
                        setMessages(response.data);
                    }).catch(error => {
                    console.log(error);
                })
            }
        }, [selectedAccount, render, messageReceiver])

        useEffect(() => {
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        }, [messages])

        const handleSendMessage = () => {
            const data = {
                message,
                sender: account,
                receiver: {id: selectedAccount.id}
            };
            saveMessage(data).then(response => {
                sendMessage(response.data);
                setRender(!render);
            }).catch(error => {
                console.log(error)
            })
            setMessage("");
        }

        const pressEnterToSend = (event) => {
            if (event.key === 'Enter')
                handleSendMessage();
        }

        const handleSelectedAccount = async (user) => {
            await changeStatusMessage(user.id, account.id);
            countUnreadMessagesByReceiverId(account.id).then(response => {
                dispatch(countUnreadMessage(response.data));
            }).catch(error => {
                console.log(error);
            })
            setSelectedAccount(user);
        }

        const handleChangeMessage = async (event) => {
            setMessage(event.target.value);
            await changeStatusMessage(selectedAccount.id, account.id);
            countUnreadMessagesByReceiverId(account.id).then(response => {
                dispatch(countUnreadMessage(response.data));
            }).catch(error => {
                console.log(error);
            })
        }

        return (
            <div className="container chat-box">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <div id="plist" className="people-list">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text h-100">
                                        <i className="fa fa-search"></i>
                                    </span>
                                    </div>
                                    <input type="text" className="form-control dropdown-toggle"
                                           placeholder="Tìm kiếm người dùng..."
                                           onChange={event => setSearch(event.target.value)}
                                           data-bs-toggle="dropdown"
                                    />
                                    <ul className="dropdown-menu w-100"
                                        style={{maxHeight: '200px', overflowY: 'auto'}}>
                                        {!_.isEmpty(usersSearch) ?
                                            usersSearch.map(item => (
                                                <li className="d-flex align-items-center dropdown-item py-2" key={item.id}
                                                    style={{cursor: 'pointer'}}
                                                    onClick={() => setSelectedAccount(item)}>
                                                    <img src={item.avatar ? item.avatar : image_default} alt="avatar"
                                                         width={30} style={{height : '30px'}}/>
                                                    <div className="ms-2">{item.username}</div>
                                                </li>
                                            ))
                                            :
                                            <li className="dropdown-item py-2">Không tìm thấy tài khoản</li>
                                        }
                                    </ul>
                                </div>
                                <ul className="list-unstyled chat-list mt-2 mb-0">
                                    {!_.isEmpty(usersAndUnreadMessage) && usersAndUnreadMessage.map(user => (
                                        <li className={`clearfix ${user.account.id === selectedAccount.id ? 'active' : ''}`}
                                            key={user.account.id}
                                            onClick={() => handleSelectedAccount(user.account)}>
                                            <img src={user.account.avatar ? user.account.avatar : image_default}
                                                 alt="avatar" style={{height : '40px' , width : '40px'}}/>
                                            <div className="about">
                                                <div className="name">{user.account.username}</div>
                                            </div>
                                            {user.countUnreadMessage ?
                                                <span className="float-end badge text-white bg-danger">
                                            {user.countUnreadMessage > 5 ? '5+' : user.countUnreadMessage}
                                                </span>
                                                :
                                                null
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="chat">
                                {!_.isEmpty(selectedAccount) ?
                                    <>
                                        <div className="chat-header clearfix">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <span>
                                                        <img
                                                            src={selectedAccount.avatar ? selectedAccount.avatar : image_default}
                                                            alt="avatar" style={{width : '50px' , height : '50px'}}/>
                                                    </span>
                                                    <div className="chat-about">
                                                        <h6 className="m-b-0">{selectedAccount.username}</h6>
                                                        {/*<small>Last seen: 2 hours ago</small>*/}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 hidden-sm text-end">
                                                    <button className="btn btn-outline-info me-2">
                                                        <i className="fa fa-cogs"></i>
                                                    </button>
                                                    <button className="btn btn-outline-warning">
                                                        <i className="fa fa-question"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-history" style={{height: '500px', overflowY: 'auto'}}
                                             ref={chatRef}>
                                            <ul className="m-b-0">
                                                {!_.isEmpty(messages) && messages.map(item => {
                                                    if (item.sender.id !== account.id)
                                                        return (
                                                            <li className="clearfix" key={item.id}>
                                                                <div className="message-data text-end">
                                                        <span className="message-data-time">
                                                            {formatDateTimeMessage(item.createAt)}
                                                        </span>
                                                                    <img
                                                                        src={item.sender.avatar ? item.sender.avatar : image_default}
                                                                        alt="avatar" style={{width : '40px' , height : '40px'}}/>
                                                                </div>
                                                                <div className="message other-message float-right">
                                                                    {item.message}
                                                                </div>
                                                            </li>
                                                        )
                                                    else
                                                        return (
                                                            <li className="clearfix" key={item.id}>
                                                                <div className="message-data">
                                                        <span className="message-data-time">
                                                            {formatDateTimeMessage(item.createAt)}
                                                        </span>
                                                                </div>
                                                                <div className="message my-message">
                                                                    {item.message}
                                                                </div>
                                                            </li>
                                                        )
                                                })}
                                            </ul>
                                        </div>
                                        <div className="chat-message clearfix">
                                            <div className="input-group mb-0">
                                                <input type="text" className="form-control py-3"
                                                       placeholder="Viết tin nhắn..."
                                                       value={message} onKeyDown={pressEnterToSend}
                                                       onChange={handleChangeMessage}/>
                                                <div className="input-group-prepend ms-3" onClick={handleSendMessage}>
                                        <span
                                            className="btn border-primary h-100 text-primary px-4 d-flex align-items-center">
                                            <i className="fa-solid fa-paper-plane"></i>
                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <div className="chat-history text-center fs-5" style={{height: '500px'}}>
                                        <p className="fs-4 fw-medium">Chào mừng đến với LUXURY</p>
                                        <p>Đặt phòng nhà, homestay trực tuyến giá rẻ</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default ChatBox;