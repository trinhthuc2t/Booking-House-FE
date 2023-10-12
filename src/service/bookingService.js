import instance from "./axiosConfig";

const API_URL = '/api/bookings';

const getBookingsByHouseId = (houseId) => {
    return instance.get(`${API_URL}/house/${houseId}`);
}

const bookingHouse = (booking) => {
    return instance.post(API_URL, booking);
}


export {getBookingsByHouseId, bookingHouse};