import axios from "axios";

const BookingsService =  {


    getBookingsByOwner: (ownerId, year) => {
        return new Promise((resolve, reject) => {
            console.log("http://localhost:8080/api/bookings/${ownerId}?year=${year}")
            axios
                .get(`http://localhost:8080/api/bookings/${ownerId}?year=${year}`)

                .then(response => {
                    resolve(response.data);
                    console.log(response.data)
                })
                .catch((err) =>{
                    console.log(err);
                });
        });
    },
    getBookingsByOwnerWeek: (ownerId,month, year,startDay,endDay) => {
        return new Promise((resolve, reject) => {
            console.log(`http://localhost:8080/api/bookings/${ownerId}/week?month=${month}&year=${year}&startDay=${startDay}&endDay=${endDay}`)
            axios
                .get(`http://localhost:8080/api/bookings/${ownerId}/week?month=${month}&year=${year}&startDay=${startDay}&endDay=${endDay}`)

                .then(response => {
                    resolve(response.data);
                    console.log(response.data)
                })
                .catch((err) =>{
                    console.log(err);
                });
        });
    },
};

export default BookingsService;