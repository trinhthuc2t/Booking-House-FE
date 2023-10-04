import axios from "axios";

const HouseService = {


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



    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            axios
                .delete(`https://dummyjson.com/products/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },


    save: (product) => {
        return new Promise((resolve, reject) => {
            axios.post('https://dummyjson.com/products/add', product)
                .then(response => {
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    },

    getProduct: (id)=>{

        return new Promise((resolve,reject) =>
            axios.get('https://dummyjson.com/products/'+id)
                .then(res =>{
                    resolve(res.data);
                })
                .catch((err)=> {
                    reject(err)
                })
        )
    }


};
export default HouseService;

