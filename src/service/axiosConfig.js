import axios from "axios";

const instance = axios.create({
    baseURL: "http://45.117.179.204:8080"
})

instance.interceptors.request.use(config => {
    const account = JSON.parse(localStorage.getItem("account"));
    if (account && account.token){
        config.headers.Authorization = `Bearer ${account.token}`;
    }
    return config;
})

export default instance;