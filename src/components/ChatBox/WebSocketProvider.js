import React, {createContext, useEffect, useState} from 'react';
import Stomp from "stompjs";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {countUnreadMessagesByReceiverId} from "../../service/messageService";
import {changeStatus, countUnreadMessage, countUnreadNotify, deleteAccount, editAccount} from "../../redux/actions";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import {countUnreadNotifyByAccountLogin} from "../../service/notifyService";
import AccountService from "../../service/AccountService";

export const WebSocketContext = createContext(null)
const WebSocketProvider = ({children}) => {
    const [messageReceiver, setMessageReceiver] = useState({});
    const [notify, setNotify] = useState({});
    const account = useSelector(state => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let socket;
    let stompClient;
    let ws;
    useEffect(() => {
        if (!_.isEmpty(messageReceiver))
            toast.success(`Bạn có 1 tin nhắn mới từ ${messageReceiver?.sender?.username}`, {position: "bottom-right"});
    }, [messageReceiver])

    useEffect(() => {
        if (!_.isEmpty(notify))
            toast.success(`Bạn có 1 thông báo mới từ ${notify?.sender?.username}`, {position: "bottom-right"});
    }, [notify])

    const sendMessage = (message) => {
        if (!stompClient) return;
        stompClient.send("/app/chat", {}, JSON.stringify(message));
    }

    const sendNotify = (notify) => {
        if (!stompClient) return;
        stompClient.send("/app/notify", {}, JSON.stringify(notify));
    }

    const sendAdmin = (notify) => {
        if (!stompClient) return;
        stompClient.send("/app/admin", {}, JSON.stringify(notify));
    }

    const blockAccountSocket = (receiverId) => {
        if (!stompClient) return;
        const data = {
            message: "Tài khoản của bạn đã bị khóa",
            sender: account,
            receiver: {id: receiverId}
        };
        stompClient.send("/app/block", {}, JSON.stringify(data));
    }

    const onConnected = () => {
        stompClient.subscribe(`/topic/${account.id}`, onMessageReceived);
        stompClient.subscribe(`/block/${account.id}`, onBlockReceived);
        stompClient.subscribe(`/notify/${account.id}`, onNotifyReceived);
        stompClient.subscribe(`/admin/${account.id}`, onAdminReceived);
    }

    const onMessageReceived = (payload) => {
        const data = JSON.parse(payload.body);
        setMessageReceiver(data);
        countUnreadMessagesByReceiverId(account.id).then(response => {
            dispatch(countUnreadMessage(response.data));
        }).catch(error => {
            console.log(error);
        })
    }

    const onBlockReceived = (payload) => {
        localStorage.removeItem("account");
        dispatch(deleteAccount());
        navigate("/403");
    }

    const onAdminReceived = (payload) => {
        const data = JSON.parse(payload.body);
        if (data.message === 'Admin đã đồng ý cho bạn làm chủ nhà' || data.message === 'Admin đã từ chối cho bạn làm chủ nhà'){
            dispatch(changeStatus());
        } else {
            setNotify(data);
            countUnreadNotifyByAccountLogin(account.id).then(response => {
                dispatch(countUnreadNotify(response.data));
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const onNotifyReceived = (payload) => {
        const data = JSON.parse(payload.body);
        if (data.message === 'Thay đổi trạng thái') {
            dispatch(changeStatus());
        } else {
            setNotify(data);
            countUnreadNotifyByAccountLogin(account.id).then(response => {
                dispatch(countUnreadNotify(response.data));
            }).catch(error => {
                console.log(error);
            })
            if (data.message === 'Admin đã đồng ý cho bạn làm chủ nhà'){
                AccountService.getAccountById(account.id).then(response => {
                    const data = {...response, token: account.token};
                    data.password = null;
                    dispatch(editAccount(data));
                    localStorage.setItem("account", JSON.stringify(data));
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    if (!socket && !_.isEmpty(account)) {
        socket = new WebSocket('ws://45.117.179.204:8080/ws/websocket');
        stompClient = Stomp.over(socket);
        stompClient.debug = null;
        stompClient.connect({}, onConnected, onError);
    }

    ws = {
        sendMessage,
        sendNotify,
        blockAccountSocket,
        messageReceiver,
        sendAdmin
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;