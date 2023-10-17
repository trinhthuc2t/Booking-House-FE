import instance from "./axiosConfig";

const API_URL = '/api/owners';

const createHouse = (data) =>{
    return instance.post(`${API_URL}/create-house`, data);
}

const editHouse = (data) =>{
    return instance.post(`${API_URL}/edit-house`, data);
}

const cancelBookingOwner = (idBooking, message) => {
    return instance.post(`${API_URL}/cancel-booking/${idBooking}`, message);
}

export {createHouse, editHouse, cancelBookingOwner};