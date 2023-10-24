import instance from "./axiosConfig";

const AccountService = {

    findAdmins: () => {
        return new Promise((resolve, reject) => {
            instance.get('/api/accounts/admins')
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err => console.log(err))
                });
        })
    },

    getAccountById: (id) => {
        return new Promise((resolve, reject) => {
            instance.get("/api/accounts/getById/" + id).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    },

    editAccount: (id, account) => {
        return new Promise((resolve, reject) => {
            instance.put("/api/accounts/" + id, account).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err);
                console.log(err);
            })
        })
    },

    checkPassword: (account) => {
        return new Promise((resolve, reject) => {
            instance.post("/api/accounts/checkPassword/" + account.id, account).then((response) => {
                resolve(response.data);
                console.log(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    },

    changePassWord: (account) => {
        return new Promise((resolve, reject) => {
            instance.put("/api/accounts/changePassword/" + account.id, account).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    },

    registerOwner: async (data) => {
        return new Promise((resolve, reject) => {
            instance.post("/api/accounts/registerOwner", data).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                alert(err);
                console.log(err);
                reject(err);
            })
        })
    },

    getOwner: (idAccount) => {
        return new Promise((resolve, reject) => {
            instance.get("/api/accounts/getByAccount/" + idAccount).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
                reject(err);
            })
        })
    },
    getListRegisterOwner: async () => {
        return await instance.get("/api/accounts/getRegisterOwner");
    },
    agreeRegister: async (data) => {
        return await instance.post("/api/accounts/agreeRegister", data);
    },
    refuseRegister: async (idOwner) => {
        return await instance.get("/api/accounts/refuseRegister/" + idOwner);
    },

    // findByRoleName: async (roleName, nameSearch, currentPage) => {
    //     return await instance.get(`/api/accounts/by-role?roleName=${roleName}&nameSearch=${nameSearch}&page=${currentPage}`);
    // },

    findByRoleName: async (roleName, nameSearch,status, currentPage) => {
        return await instance.get(`/api/accounts/getAccountByRole?roleName=${roleName}&nameSearch=${nameSearch}&status=${status}&page=${currentPage}`);
    },
    blockAccount: (accId) => {
        return instance.get("/api/accounts/block/" + accId);
    },
    unblockAccount: (accId) => {
        return instance.get("/api/accounts/unBlock/" + accId);
    },
    findUser : async  (roleName, nameSearch, status, currentPage) => {
        return await  instance.get(`/api/accounts/getUser?roleName=${roleName}&nameSearch=${nameSearch}&page=${currentPage}&status=${status}`)
    },
    findOwner : async  ( nameSearch, currentPage) => {
        return await  instance.get(`/api/owners/getOwnerDto?nameSearch=${nameSearch}&page=${currentPage}`)
    },
    listUserAndUnreadMessage: (accountId) => {
        return instance.get(`/api/accounts/${accountId}/messages`);
    },
    searchUsersMessage: (accountId, username) => {
        return instance.get(`/api/accounts/${accountId}/messages/search?username=${username}`);
    },
    checkBlockAccount: (accountId) => {
        return instance.get(`/api/accounts/check-block/${accountId}`);
    }
}
export default AccountService;