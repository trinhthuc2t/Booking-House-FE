import axios from 'axios';

const HouseByIdService = {

    getHousesByOwnerId: (ownerId, currentPage) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses/owner/' + ownerId + "?page=" + currentPage )
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err=>console.log(err))
                });
        })
    },

    updateStatusHouse: (id, status) => {
        return new Promise((resolve, reject) => {
            axios
                .put(`http://localhost:8080/api/houses/owner/${id}?status=${status}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    getAllHouseByPriceAndProvince: (currentPage = 0, nameSearch = "", province = "", minPrice = 0, maxPrice = 0) => {
        return new Promise((resolve, reject) => {
            const formattedProvince = province.replace(/\s/g, "_");
            axios
                .get(`http://localhost:8080/api/houses/search?page=${currentPage}&nameSearch=${nameSearch}&province=${formattedProvince}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
                .then(response => {
                    resolve(response.data);
                    console.log(response.data);
                })
                .catch(function (err) {
                    reject(err => console.log(err));
                });
        });
    },

    findByOwnerIdAndNameContains: (ownerId, name,currentPage) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses/owner/by-name/' + ownerId + "?name=" + name + "&page=" + currentPage)
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    },


    findByOwnerIdAndStatus: (ownerId, status,currentPage) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses/owner/by-status/' + ownerId + "?status=" + status + "&page=" + currentPage)
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    },

};


export default HouseByIdService;
