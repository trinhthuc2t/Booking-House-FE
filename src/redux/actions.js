export const SAVE_ACCOUNT = 'SAVE_ACCOUNT';
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

export const saveAccount = (account) => {
    return {
        type: SAVE_ACCOUNT,
        payload: account
    };
}
export const editAccount = (account) => {
    return {
        type: EDIT_ACCOUNT,
        payload: account
    };
}

export const deleteAccount = () => {
    return {
        type: DELETE_ACCOUNT,
    };
}