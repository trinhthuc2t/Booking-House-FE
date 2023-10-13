import axios from "axios";

const BookingsService =  {

    searchBookingsByOwnerId: (ownerId,nameSearch,status,yearStart,monthStart,dayStart,yearEnd,monthEnd,dayEnd, currentPage) => {
        return new Promise((resolve, reject) => {
            const formattedStatus = status.replace(/\s/g, "_");
            console.log(ownerId,nameSearch,status,yearStart,monthStart,dayStart,yearEnd,monthEnd,dayEnd, currentPage)
            console.log(`http://localhost:8080/api/bookings/${ownerId}/search?nameSearch=${nameSearch}&status=${formattedStatus}&yearStart=${yearStart}&monthStart=${monthStart}&dayStart=${dayStart}&yearEnd=${yearEnd}&monthEnd=${monthEnd}&dayEnd=${dayEnd}&page=${currentPage}`)

            axios
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

    getBookingsByOwnerWeek: (ownerId,month, year,startDay,endDay,currentPage) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`http://localhost:8080/api/bookings/${ownerId}/week?month=${month}&year=${year}&startDay=${startDay}&endDay=${endDay}&page=${currentPage}`)
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