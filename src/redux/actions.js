export const SAVE_ACCOUNT = 'SAVE_ACCOUNT';
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

export const saveAccount = (payload) => {
    return {
        type: SAVE_ACCOUNT,
        payload
    };
}
export const editAccount = (payload) => {
    return {
        type: EDIT_ACCOUNT,
        payload
    };
}

export const deleteAccount = () => {
    return {
        type: DELETE_ACCOUNT,
    };
}