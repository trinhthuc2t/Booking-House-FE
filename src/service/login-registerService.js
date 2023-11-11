import axios from "axios";

class LoginRegisterService{
    static getAccountByUsername(username){
        return axios.get(`http://54.254.46.3:8080/api/accounts/` + username)
    }
    static register(account){
        return axios.post(`http://54.254.46.3:8080/api/register`, account)
    }
    static login(account){
        return axios.post(`http://54.254.46.3:8080/api/login`, account)
    }

    static checkUsername(username){
        return axios.get(`http://54.254.46.3:8080/api/login/check-username?username=` + username)
    }

    static checkEmail(email){
        return axios.get(`http://54.254.46.3:8080/api/login/check-email?email=` + email)
    }
    static sendPassword(email){
        return axios.post(`http://54.254.46.3:8080/api/forgot`, email)
    }
}
export default LoginRegisterService