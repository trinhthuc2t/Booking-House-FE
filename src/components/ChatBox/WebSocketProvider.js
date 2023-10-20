import React, {createContext, useEffect, useState} from 'react';
import Stomp from "stompjs";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {countUnreadMessagesByReceiverId} from "../../service/messageService";
import {changeStatus, countUnreadMessage, countUnreadNotify, deleteAccount} from "../../redux/actions";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import {countUnreadNotifyByAccountLogin} from "../../service/notifyService";

export const WebSocketContext = createContext(null)
const WebSocketProvider = ({children}) => {
    const [render, setRender] = useState(true);
    const [message, setMessage] = useState({});
    const [notify, setNotify] = useState({});
    const account = useSelector(state => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let socket;
    let stompClient;
    let ws;
    useEffect(()=>{
        if (!_.isEmpty(message))
        toast.success(`Bạn có 1 tin nhắn mới từ ${message?.sender?.username}`, {position: "bottom-right"});
    }, [message])

    useEffect(()=>{
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
    }

    const onMessageReceived = (payload) => {
        const data = JSON.parse(payload.body);
        setMessage(data);
        countUnreadMessagesByReceiverId(account.id).then(response => {
            dispatch(countUnreadMessage(response.data));
        }).catch(error => {
            console.log(error);
        })
        setRender(!render);
    }

    const onBlockReceived = (payload) => {
        localStorage.removeItem("account");
        dispatch(deleteAccount());
        navigate("/403");
    }

    const onNotifyReceived = (payload) => {
        const data = JSON.parse(payload.body);
        if (data.message === 'Thay đổi trạng thái'){
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

    const onError = (err) => {
        console.log(err);
    }

    if (!socket && !_.isEmpty(account)) {
        socket = new WebSocket('ws://localhost:8080/ws/websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }

    ws = {
        sendMessage,
        sendNotify,
        blockAccountSocket,
        render,
        setRender
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;