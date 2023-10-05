import axios from "axios";

const API_URL = 'http://localhost:8080/api/owners';

const createHouse = (data) =>{
    return axios.post(`${API_URL}/create-house`, data);
}

export {createHouse};