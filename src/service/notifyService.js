import instance from "./axiosConfig";

const getAllNotifyByAccountLogin = (accountId) => {
    return instance.get(`/api/notifications/${accountId}`)
}

const countUnreadNotifyByAccountLogin = (accountId) => {
    return instance.get(`/api/notifications/count-unread/${accountId}`)
}

const changeStatusNotify = (accountId) => {
    return instance.put(`/api/notifications/change-status/${accountId}`)
}

const saveNotify = (notify) => {
    return instance.post('/api/notifications', notify)
}

export {
    getAllNotifyByAccountLogin,
    countUnreadNotifyByAccountLogin,
    changeStatusNotify,
    saveNotify
};