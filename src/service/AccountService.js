import instance from "./axiosConfig";
const AccountService = {

    findAdmins: () => {
        return new Promise((resolve, reject) => {
            instance.get('/api/accounts/admins')
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err=>console.log(err))
                });
        })
    },

    getAccountById: (id) => {
        return new Promise( (resolve, reject) => {
            instance.get("/api/accounts/getById/" + id).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    },

    editAccount: (id , account) => {
        return new Promise( (resolve, reject) => {
            instance.put("/api/accounts/" + id , account).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err);
                console.log(err);
            })
        })
    },

    checkPassword: (account) => {
        return new Promise( (resolve, reject) => {
            instance.post("/api/accounts/checkPassword/" + account.id , account).then((response) => {
                resolve(response.data);
                console.log(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    },

    checkToken: (token) => {
            return axios.get("http://localhost:8080/api/forgot/check-token?token=" + token);
    },

    changePassWord: (account) => {
        return new Promise( (resolve, reject) => {
            instance.put("/api/accounts/changePassword/" + account.id , account).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    },

    registerOwner:  (data) => {
        return new Promise( (resolve, reject) => {
            instance.post("/api/accounts/registerOwner" , data).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                alert(err);
                console.log(err);
                reject(err);
            })
        })
    },

    getOwner : (idAccount) => {
        return new Promise( (resolve, reject) => {
            instance.get("/api/accounts/getByAccount/" + idAccount ).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
                reject(err);
            })
        })
    },
    getListRegisterOwner :  async () => {
        return await instance.get("/api/accounts/getRegisterOwner");
    },
    agreeRegister :  async (data) => {
        return await instance.get("/api/accounts/agreeRegister" , data);
    },
    refuseRegister : async (idOwner) => {
        return await instance.get("/api/accounts/refuseRegister/" + idOwner);
    },






}
export default AccountService;