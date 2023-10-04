import React, {useEffect, useState} from 'react';
import houseByIdService from "../../service/HouseByIdService";
import {useParams} from "react-router-dom";

const ByNameAndStatus = () => {


    const [houses, setHouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const search = useParams("");
    // const pageSize = 5;
    const getHousesByOwnerId = (id) => {
        houseByIdService.getHousesByOwnerId(id)
            .then((houses) => {
                setHouses(houses);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const checkSearchName = (id, search) => {
        const validStatusValues = ["available", "booked", "repair"];

        if (validStatusValues.includes(search)) {
            findByOwnerIdAndStatus(id, search);
        }else  {
            findByOwnerIdAndNameContains(id,search)
        }
    }
    const findByOwnerIdAndStatus = (id, search) => {
        houseByIdService.findByOwnerIdAndStatus(id, search)
            .then((houses) => {
                setHouses(houses);
            })
            .catch((err) => {
                console.log(err);
            });

    };


    const findByOwnerIdAndNameContains = (id, search) => {
        houseByIdService.findByOwnerIdAndNameContains(id, search)
            .then((houses) => {
                setHouses(houses);
            })
            .catch((err) => {
                console.log(err);
            });
    };





    useEffect(() => {
        const id = 2;
        checkSearchName(id, search.search);
    }, [search])


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getHousesByOwnerId(2, newPage);
    };
    return (
        <div>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="tab-className text-center wow fadeInUp" data-wow-delay="0.3s">
                        <div className="tab-content">
                            <div className="job-item p-4 mb-4">

                                <div className="row g-4">
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
                                                className="col-sm-12 col-md-5 d-flex flex-column align-items-start align-items-md-end justify-content-center">
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
    );
};

export default ByNameAndStatus;