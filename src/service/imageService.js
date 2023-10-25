import axios from "axios";

const API_URL = 'http://45.117.179.204:8080/api/images'

const getAllImagesByHouseId = (houseId) => {
    return axios.get(`${API_URL}/house/${houseId}`);
}

export {getAllImagesByHouseId}