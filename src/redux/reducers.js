// reducers.js
import {DELETE_ACCOUNT, EDIT_ACCOUNT, SAVE_ACCOUNT} from './actions';

const initialState = {
    account: JSON.parse(localStorage.getItem("account")) ?
        JSON.parse(localStorage.getItem("account")) :
        {}
};

export const accountInfo = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ACCOUNT:
            return {
                account: action.payload
            };
        case EDIT_ACCOUNT:
            return {
                account: {...action.payload}
            };

        case DELETE_ACCOUNT:
            return {
                account: {}
            };
        default:
            return state;
    }
}
