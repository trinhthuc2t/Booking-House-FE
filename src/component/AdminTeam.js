import React from 'react';

const AdminTeam = () => {
    return (
        <div className="container py-5 container-admin-team">
            <div className="container">
                <div className="row g-4">
                    <h4 className="text-center">Thành viên Admin</h4>
                    <div className="col-lg-3 col-md-6">
                        <div className="team-item rounded overflow-hidden border">
                            <div className="position-relative">
                                <img className="img-fluid" src="img/house/team-1.jpg" alt=""/>
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
                                <h5 className="fw-bold mb-0">Trịnh Thục</h5>
                                <small>FA</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTeam;