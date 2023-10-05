import axios from "axios";

class LoginRegisterService{
    static getAccountByUsername(username){
        return axios.get("http://localhost:8080/api/accounts/" + username)
    }
    static register(account){
        return axios.post("http://localhost:8080/api/register", account)
    }
    static login(account){
        return axios.post("http://localhost:8080/api/login", account)
    }
}
export default LoginRegisterService