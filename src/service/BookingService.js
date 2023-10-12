import instance from "./axiosConfig";
import axios from "axios";

const BookingService = {
    getHistoryByAccount: async (id, currentPage = 0) => {
        return await instance.get(`/api/bookings/getByIdAccount/${id}?page=${currentPage}&`);
    },
    cancelBooking: async (idBooking) => {
        return await instance.get("/api/bookings/cancelBooking/" + idBooking);
    },
    getBookingsByOwnerWeek: (ownerId, month, year, startDay, endDay) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`http://localhost:8080/api/bookings/${ownerId}/week?month=${month}&year=${year}&startDay=${startDay}&endDay=${endDay}`)
                .then(response => {
                    resolve(response.data);
                    console.log(response.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    },
    getBookingsByHouseId: (houseId) => {
        return instance.get(`/api/bookings/house/${houseId}`);
    },

    bookingHouse: (booking) => {
        return instance.post('/api/bookings', booking);
    }
};

export default BookingService;