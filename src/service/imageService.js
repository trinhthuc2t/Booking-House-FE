import axios from "axios";

const API_URL = `http://54.254.46.3:8080/api/images`;

const getAllImagesByHouseId = (houseId) => {
    return axios.get(`${API_URL}/house/${houseId}`);
}

export {getAllImagesByHouseId}