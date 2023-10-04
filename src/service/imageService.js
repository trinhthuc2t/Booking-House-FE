import axios from "axios";

const API_URL = 'http://localhost:8080/api/images'

const getAllImagesByHouseId = (houseId) => {
    return axios.get(`${API_URL}/house/${houseId}`);
}

export {getAllImagesByHouseId}