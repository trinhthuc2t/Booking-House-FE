import React, {Component} from 'react';
import axios from "axios";

class AccountService extends Component {


     getAccountById = (id) => {
        return new Promise( (resolve, reject) => {
            axios.get("http://localhost:8080/api/accounts/getById/" + id).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    }

    editAccount = (id , account) => {
        return new Promise( (resolve, reject) => {
            axios.put("http://localhost:8080/api/accounts/" + id , account).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err);
                console.log(err);
            })
        })
    }

    checkPassword = (account) => {
        return new Promise( (resolve, reject) => {
            axios.post("http://localhost:8080/api/accounts/checkPassword/" + account.id , account).then((response) => {
                resolve(response.data);
                console.log(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    }

    changePassWord = (account) => {
        return new Promise( (resolve, reject) => {
            axios.put("http://localhost:8080/api/accounts/changePassword/" + account.id , account).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
            })
        })
    }

    registerOwner = (id ,account) => {
        return new Promise( (resolve, reject) => {
            axios.post("http://localhost:8080/api/accounts/registerOwner/" + id , account).then((response) => {
                resolve(response.data);
            }).catch(function (err) {
                console.log(err);
                reject(err);
            })
        })
    }


    render() {
        return (
            <div>

            </div>
        );
    }
}
let accountService = new  AccountService();
export default accountService;

