import React from 'react';
import instance from "./axiosConfig";

const BookingService = {
    getHistoryByAccount : async (id , currentPage = 0) => {
        return await instance.get(`/api/bookings/getByIdAccount/${id}?page=${currentPage}&`  );
    },
    cancelBooking : async (idBooking) => {
        return await instance.get("/api/bookings/cancelBooking/" + idBooking);
    }


};

export default BookingService;