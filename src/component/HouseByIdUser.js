import React, {useEffect, useState} from 'react';
import houseByIdService from "../service/HouseByIdService";
import {useParams} from "react-router-dom";

const HouseByIdUser = () => {

    const [houses, setHouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const getHousesByOwnerId = (id) => {
        houseByIdService.getHousesByOwnerId(id)
            .then((houses) => {
                setHouses(houses);
                console.log(houses)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const findByOwnerIdAndStatus = (id, status) => {
        houseByIdService.getHousesByOwnerId(id, status)
            .then((houses) => {
                setHouses(houses);
                console.log(houses)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const findByOwnerIdAndNameContains = (id, name) => {
        houseByIdService.findByOwnerIdAndNameContains(id, name)
            .then((houses) => {
                setHouses(houses);
                console.log(houses)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getHousesByOwnerId(2, newPage);
    };

    useEffect(() => {
        getHousesByOwnerId(2, currentPage);
    }, [currentPage]);

    useEffect(() => {
        const ownerId = 2;
        getHousesByOwnerId(ownerId);
    }, [])


    return (
        <div>
            <div className="container-fluid mb-5 wow fadeIn" data-wow-delay="0.1s"
                 style={{padding: 35, backgroundColor: "rgb(0,185,142)"}}>
                <div className="container">
                    <div className="row g-2">
                        <div className="col-md-10">
                            <div className="row g-2">

                                <div className="col-md-4">
                                    <select className="form-select border-0"
                                            onChange={(e) => findByOwnerIdAndStatus(e.target.value)}>
                                        <option onChange={getHousesByOwnerId} selected>Tất cả</option>

                                        <option value="available">Đang trống</option>
                                        <option value="booked">Đang cho thuê</option>
                                        <option value="repair">Đang bảo trì</option>
                                    </select>

                                </div>

                                <div className="col-md-8">
                                    <input type="text" className="form-control border-0" placeholder="Search"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-dark border-0 w-100">Search</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container-xxl py-5">
                <div className="container">
                    <div className="tab-className text-center wow fadeInUp" data-wow-delay="0.3s">
                        <div className="tab-content">
                            <div className="job-item p-4 mb-4">


                                <div className="row g-4">
                                    <div className="col-sm-12 col-md-6 d-flex align-items-center">
                                        <h4>Thông tin</h4>
                                    </div>

                                    <div
                                        className="col-sm-12 col-md-2 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                        <h5>Doanh thu</h5>
                                    </div>
                                    <div
                                        className="col-sm-12 col-md-3 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                        <h4 style={{paddingLeft: 110}}>Action</h4>
                                    </div>


                                </div>
                                {houses.map((house) => {
                                    return (
                                        <div className="row g-4" key={house.id}>
                                            <div className="col-sm-12 col-md-7 d-flex align-items-center">
                                                <img className="flex-shrink-0 img-fluid border rounded"
                                                     src={house.thumbnail} alt=""
                                                     style={{width: 80, height: 80}}/>
                                                <div className="text-start ps-4">
                                                    <h5 className="mb-3">{house.name}</h5>
                                                    <span className="text-truncate me-3"><i
                                                        className="fa fa-map-marker-alt me-2"
                                                        style={{color: "rgb(0,185,142)"}}></i>{house.address}</span>
                                                    <span className="text-truncate me-3"><i
                                                        className="far fa-clock  me-2"
                                                        style={{color: "rgb(0,185,142)"}}></i>{house.status}</span>
                                                    <span className="text-truncate me-0"><i
                                                        className="far fa-money-bill-alt  me-2"
                                                        style={{color: "rgb(0,185,142)"}}></i>{house.price}</span>
                                                </div>
                                            </div>

                                            <div
                                                className="col-sm-12 col-md-1 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                                <b>{house.revenue} - VNĐ</b>
                                            </div>
                                            <div
                                                className="col-sm-12 col-md-3 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                                <div className="d-flex mb-3">
                                                    <a className="btn"
                                                       style={{backgroundColor: "rgb(0,185,142)", textcolor: "white"}}
                                                       href="">Edit</a>
                                                </div>
                                            </div>
                                            


                                        </div>
                                    )
                                })}
                            </div>
                            <nav aria-label="Page navigation">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#"
                                           onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                                    </li>
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#" onClick={() => handlePageChange(1)}>1</a>
                                    </li>
                                    <li className={`page-item ${currentPage === 2 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#" onClick={() => handlePageChange(2)}>2</a>
                                    </li>
                                    <li className={`page-item ${currentPage === 3 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#" onClick={() => handlePageChange(3)}>3</a>
                                    </li>
                                    <li className={`page-item ${currentPage === 3 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#"
                                           onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
};

export default HouseByIdUser;