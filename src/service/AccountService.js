import axios from 'axios';

const AccountService = {

    findAdmins: () => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/accounts/admins')
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
            axios.get("http://localhost:8080/api/accounts/getById/" + id).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    },

    editAccount: (id , account) => {
        return new Promise( (resolve, reject) => {
            axios.put("http://localhost:8080/api/accounts/" + id , account).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err);
                console.log(err);
            })
        })
    },

    checkPassword: (account) => {
        return new Promise( (resolve, reject) => {
            axios.post("http://localhost:8080/api/accounts/checkPassword/" + account.id , account).then((response) => {
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
            axios.put("http://localhost:8080/api/accounts/changePassword/" + account.id , account).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    },

    registerOwner: (id ,account) => {
        return new Promise( (resolve, reject) => {
            axios.post("http://localhost:8080/api/accounts/registerOwner/" + id , account).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
                reject(err);
            })
        })
    }
}
export default AccountService;