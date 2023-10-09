import React, {useEffect, useState} from 'react';
import accountService from "../../service/AccountService";

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
                                            <img height={270} width={292} src={acc.avatar} alt=""/>
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

                                        <div className="text-center p-4 mt-3">
                                            <h5 className="fw-bold mb-0">{acc.firstname} {acc.lastname}</h5>
                                            <small>FA</small>
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