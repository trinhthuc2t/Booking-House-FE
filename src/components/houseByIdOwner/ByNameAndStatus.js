import React, {useEffect, useState} from 'react';
import houseByIdService from "../../service/HouseByIdService";
import {useParams} from "react-router-dom";

const ByNameAndStatus = () => {


    const [houses, setHouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const search = useParams("");

    const checkSearchName = (id, search, currentPage) => {
        const validStatusValues = ["available", "booked", "repair"];
        if (validStatusValues.includes(search)) {
            findByOwnerIdAndStatus(id, search,currentPage);
        }else  {
            findByOwnerIdAndNameContains(id,search,currentPage)
        }
    }
    const findByOwnerIdAndStatus = (id, search,currentPage) => {
        houseByIdService.findByOwnerIdAndStatus(id, search,currentPage)
            .then((houses) => {
                setHouses(houses);
            })
            .catch((err) => {
                console.log(err);
            });

    };


    const findByOwnerIdAndNameContains = (id, search,currentPage) => {
        houseByIdService.findByOwnerIdAndNameContains(id, search,currentPage)
            .then((houses) => {
                setHouses(houses);
            })
            .catch((err) => {
                console.log(err);
            });
    };





    useEffect(() => {
        checkSearchName(2, search.search,currentPage);
    }, [search,currentPage])


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        const ownerId = 2;
        checkSearchName( ownerId,search.search,currentPage);
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
                                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                        <a className="page-link"
                                           onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                                    </li>
                                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => handlePageChange(0)}>1</a>
                                    </li>
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => handlePageChange(1)}>2</a>
                                    </li>
                                    <li className={`page-item ${currentPage === 2 ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => handlePageChange(2)}>3</a>
                                    </li>
                                    <li className={`page-item ${currentPage === 2 ? 'disabled' : ''}`}>
                                        <a className="page-link"
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