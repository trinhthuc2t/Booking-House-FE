import axios from "axios";

const API_URL = 'http://45.117.179.204:8080/api/reviews'

const getAllReviewsByHouseId = (houseId, page = 0, size = 5) => {
    return axios.get(`${API_URL}/house/${houseId}?page=${page}&size=${size}`);
}

const avgRatingByHouseId = (houseId) => {
    return axios.get(`${API_URL}/avg-rating/${houseId}`);
}

const getAllReviewsByAccountId = (accountId) => {
    return axios.get(`${API_URL}/accounts/${accountId}`);
}

export {getAllReviewsByHouseId, avgRatingByHouseId, getAllReviewsByAccountId}