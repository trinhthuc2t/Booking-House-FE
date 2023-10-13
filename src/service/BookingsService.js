import axios from "axios";

const BookingsService =  {


    getAllBookingByOwnerId: (id) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`http://localhost:8080/api/bookings/${id}`)
                .then(response => {
                    resolve(response.data);
                    console.log(response.data.content)
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    getBookingsByOwnerWeek: (ownerId,month, year,startDay,endDay) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`http://localhost:8080/api/bookings/${ownerId}/week?month=${month}&year=${year}&startDay=${startDay}&endDay=${endDay}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch((err) =>{
                    console.log(err);
                });
        });
    },
};

export default BookingsService;