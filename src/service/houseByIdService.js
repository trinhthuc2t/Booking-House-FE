import axios from "axios";

const HouseByIdService = {


    getHousesByOwnerId: (ownerId) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses/owner/' + ownerId)
                .then(response => {
                    resolve(response.data.content);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    },

    findByOwnerIdAndNameContains: (ownerId, name) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses/owner/by-name/' + ownerId)
                .then(response => {
                    resolve(response.data.content);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    },
    findByOwnerIdAndStatus: (ownerId, status) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses/owner/by-status/' + ownerId)
                .then(response => {
                    resolve(response.data.content);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    },



};
export default HouseService;

