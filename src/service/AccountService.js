import axios from 'axios';

const AccountService = {

    findAdmins: () => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/accounts/admins')
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err=>console.log(err))
                });
        })
    }
}
export default AccountService;