import React, {useEffect, useState} from 'react';
import houseByIdService from "../../service/HouseByIdService";

const ByOwnerId = () => {

    const [houses, setHouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const getHousesByOwnerId = (id,currentPage) => {
        houseByIdService.getHousesByOwnerId(id,currentPage)
            .then((houses) => {
                setHouses(houses);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getHousesByOwnerId(2, currentPage);
    };

    useEffect(() => {
        getHousesByOwnerId(2, currentPage);
    }, [currentPage]);

    useEffect(() => {
        const ownerId = 2;
        getHousesByOwnerId( ownerId,currentPage);
    }, [])
    return (
        <div>
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
                                        <a className="page-link" href="#" onClick={() => handlePageChange(0)}>1</a>
                                    </li>
                                    <li className={`page-item ${currentPage === 2 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#" onClick={() => handlePageChange(1)}>2</a>
                                    </li>
                                    <li className={`page-item ${currentPage === 3 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#" onClick={() => handlePageChange(2)}>3</a>
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

export default ByOwnerId;