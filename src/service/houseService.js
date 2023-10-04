import axios from "axios";

const API_URL = 'http://localhost:8080/api/houses';

const getHouseById = (id) => {
  return axios.get(`${API_URL}/${id}`);
}

export {getHouseById};