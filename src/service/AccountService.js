import axios from 'axios';
import instance from "./axiosConfig";


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

    changePassWord: (account) => {
        return new Promise( (resolve, reject) => {
            axios.put("http://localhost:8080/api/accounts/changePassword/" + account.id , account).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    },

    registerOwner:  (data) => {
        return new Promise( (resolve, reject) => {
            instance.post("http://localhost:8080/api/accounts/registerOwner" , data).then((response) => {
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
            axios.get("http://localhost:8080/api/accounts/getByAccount/" + idAccount ).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
                reject(err);
            })
        })
    }
}
export default AccountService;