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
            instance
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
    },
    searchBookingsByOwnerId: (ownerId,nameSearch,status,yearStart,monthStart,dayStart,yearEnd,monthEnd,dayEnd, currentPage) => {
        return new Promise((resolve, reject) => {
            const formattedStatus = status.replace(/\s/g, "_");
            console.log(ownerId,nameSearch,status,yearStart,monthStart,dayStart,yearEnd,monthEnd,dayEnd, currentPage)
            console.log(`http://localhost:8080/api/bookings/${ownerId}/search?nameSearch=${nameSearch}&status=${formattedStatus}&yearStart=${yearStart}&monthStart=${monthStart}&dayStart=${dayStart}&yearEnd=${yearEnd}&monthEnd=${monthEnd}&dayEnd=${dayEnd}&page=${currentPage}`)

            instance
                .get(`http://localhost:8080/api/bookings/${ownerId}/search?nameSearch=${nameSearch}&status=${formattedStatus}&yearStart=${yearStart}&monthStart=${monthStart}&dayStart=${dayStart}&yearEnd=${yearEnd}&monthEnd=${monthEnd}&dayEnd=${dayEnd}&page=${currentPage}`)
                .then(response => {
                    resolve(response.data);
                    // console.log(response.data.content)
                })
                .catch(error => {
                    reject(error);
                });
        });
    },


};


export default BookingService;