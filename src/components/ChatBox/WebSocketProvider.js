import React, {createContext, useEffect, useState} from 'react';
import Stomp from "stompjs";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {countUnreadMessagesByReceiverId} from "../../service/messageService";
import {countUnreadMessage} from "../../redux/actions";
import _ from "lodash";

export const WebSocketContext = createContext(null)
const WebSocketProvider = ({children}) => {
    const [render, setRender] = useState(true);
    const [message, setMessage] = useState({});
    const account = useSelector(state => state.account);
    const dispatch = useDispatch();
    let socket;
    let stompClient;
    let ws;
    useEffect(()=>{
        if (!_.isEmpty(message))
        toast.success(`Bạn có 1 tin nhắn mới từ ${message?.sender?.username}`, {position: "bottom-right"});
    }, [message])

    const sendMessage = (receiver, message) => {
        if (!stompClient) return;
        const data = {
            message,
            sender: account,
            receiver: {id: receiver.id}
        };
        stompClient.send("/app/chat", {}, JSON.stringify(data));
    }

    const onConnected = () => {
        stompClient.subscribe(`/topic/${account.id}`, onMessageReceived);
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

    const onError = (err) => {
        console.log(err);

    }

    if (!socket) {
        socket = new WebSocket('ws://localhost:8080/ws/websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);

        ws = {
            socket: socket,
            sendMessage,
            render,
            setRender
        }
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;