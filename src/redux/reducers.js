// reducers.js
import {
    CHANGE_STATUS,
    COUNT_UNREAD_MESSAGE,
    COUNT_UNREAD_NOTIFY,
    DELETE_ACCOUNT,
    EDIT_ACCOUNT,
    GET_ALL_NOTIFY,
    SAVE_ACCOUNT
} from './actions';

const initialState = {
    account: JSON.parse(localStorage.getItem("account")) ?
        JSON.parse(localStorage.getItem("account")) :
        {},
    unreadMessage: 0,
    unreadNotify: 0,
    notifyList: [],
    toggleStatus: true
};

export const accountInfo = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ACCOUNT:
            return {
                ...state,
                account: action.payload
            };
        case EDIT_ACCOUNT:
            return {
                ...state,
                account: {...action.payload}
            };

        case DELETE_ACCOUNT:
            return {
                ...state,
                account: {}
            };
        case COUNT_UNREAD_MESSAGE:
            return {
                ...state,
                unreadMessage: action.payload
            };
        case COUNT_UNREAD_NOTIFY:
            return {
                ...state,
                unreadNotify: action.payload
            };
        case GET_ALL_NOTIFY:
            return {
                ...state,
                notifyList: action.payload
            };
        case CHANGE_STATUS:
            return {
                ...state,
                toggleStatus: !state.toggleStatus
            }
        default:
            return state;
    }
}
