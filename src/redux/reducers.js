// reducers.js
import {COUNT_UNREAD_MESSAGE, DELETE_ACCOUNT, EDIT_ACCOUNT, SAVE_ACCOUNT} from './actions';

const initialState = {
    account: JSON.parse(localStorage.getItem("account")) ?
        JSON.parse(localStorage.getItem("account")) :
        {},
    unreadMessage: 0
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
            }
        default:
            return state;
    }
}
