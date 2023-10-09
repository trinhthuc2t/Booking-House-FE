import axios from "axios";

const API_URL = 'http://localhost:8080/api/houses';

const getHouseById = (id) => {
  return axios.get(`${API_URL}/${id}`);
}

const getHouseByIdAndOwnerId = (id, ownerId) => {
  return axios.get(`${API_URL}/${id}/${ownerId}`);
}

export {getHouseById, getHouseByIdAndOwnerId};