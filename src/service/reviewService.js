import axios from "axios";

const API_URL = 'http://localhost:8080/api/reviews'

const getAllReviewsByHouseId = (houseId) => {
    return axios.get(`${API_URL}/house/${houseId}`);
}

const avgRatingByHouseId = (houseId) => {
    return axios.get(`${API_URL}/avg-rating/${houseId}`);
}

export {getAllReviewsByHouseId, avgRatingByHouseId}