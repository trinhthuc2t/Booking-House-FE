import instance from "./axiosConfig";

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
                .get(`/api/bookings/${ownerId}/week?month=${month}&year=${year}&startDay=${startDay}&endDay=${endDay}`)
                .then(response => {
                    resolve(response.data);
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



    searchBookingsByOwnerId: (ownerId, nameSearch, status, selectedDateStart, selectedDateEnd, currentPage) => {
        const requestData = {
            ownerId: ownerId,
            nameSearch: nameSearch,
            status: status,
            selectedDateStart: selectedDateStart,
            selectedDateEnd: selectedDateEnd,
        };
        return instance
            .post(`/api/bookings/${ownerId}/search?page=${currentPage}`, requestData)

    },



    cancelBookingAdmin: (idBooking) => {
        return instance.post("/api/bookings/cancel/" + idBooking);
    },
    waitOwnerConfirmBooking: (idBooking) => {
        return instance.post("/api/bookings/wait/" + idBooking);
    },
    checkinBookingAdmin: (idBooking) => {
        return instance.post("/api/bookings/checkin/" + idBooking);
    },
    checkoutBookingAdmin: (idBooking) => {
        return instance.post("/api/bookings/checkout/" + idBooking);
    },

};


export default BookingService;