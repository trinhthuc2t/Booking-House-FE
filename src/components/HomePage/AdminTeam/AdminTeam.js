import React, {useEffect, useState} from 'react';
import accountService from "../../../service/AccountService";

const AdminTeam = () => {
    const [accounts, setAccounts] = useState([]);

    const findAdmins = () => {
        accountService.findAdmins()
            .then((accounts) => {
                setAccounts(accounts);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        findAdmins();
    }, [])
    return (

        <div className="container py-5 container-admin-team">
            <div className="container">
                <div className="row g-4">
                    <h5 className="text-center">Liên hệ Admin</h5>
                    {accounts.map(acc => {
                            return (
                                <div className="col-lg-3 col-md-6" key={acc.id}>
                                    <div className="team-item rounded overflow-hidden border">
                                        <div className="position-relative">
                                            <img className="img-thumbnail" src={acc.avatar} alt=""
                                            style={{aspectRatio: '1/1'}}/>
                                            <div
                                                className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                                                <a className="btn btn-square rounded-circle mx-1" href="">
                                                    <i className="fab fa-facebook-f"></i>
                                                </a>
                                                <a className="btn btn-square rounded-circle mx-1" href="">
                                                    <i className="fab fa-twitter"></i>
                                                </a>
                                                <a className="btn btn-square rounded-circle mx-1" href="">
                                                    <i className="fab fa-instagram"></i>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="p-4 mt-3">
                                            <h5 className="fw-bold mb-2 text-center">{acc.lastname} {acc.firstname} </h5>
                                            <div className=""><i className="bi bi-person-vcard-fill me-3 text-house"></i>{acc.username}</div>
                                            <div><i className="bi bi-telephone-fill me-3 text-house"></i>{acc.phone}</div>
                                            <div><i className="bi bi-envelope-fill me-3 text-house"></i>{acc.email}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminTeam;