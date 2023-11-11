import React from 'react';
import _ from 'lodash';
import '../home.scss';
import {Pagination} from "@mui/material";
import {formatCurrency} from "../../../service/format";
import {Link} from "react-router-dom";

const HouseComponent = ({houses, totalPages, changePage}) => {

    return (
        <div className="container">
            <div className="row g-4">
                {
                    !_.isEmpty(houses) ? houses.map(house => {
                        return (
                            <div className="col-lg-4 col-md-6" key={house.id}>
                                <div className="house-item border rounded overflow-hidden">
                                    <Link to={`/house-detail/${house.id}`} className="nav-link">
                                        <div className="position-relative overflow-hidden">
                                            <div>
                                                <img height={273} width={406} src={house.thumbnail} alt=""/>
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="mb-2 text-center text-truncate">{house.name}</h5>
                                            <h5 className=" mb-3 color-primary text-center">
                                                {formatCurrency(house.price - house.price * house.sale / 100)} / ngày
                                                {house.sale ?
                                                    <del className="text-secondary ms-3 fs-6">
                                                        {formatCurrency(house.price)}
                                                    </del>
                                                    :
                                                    null
                                                }
                                            </h5>
                                            <p className="text-truncate">
                                                <i className="fa fa-map-marker-alt me-2 color-primary"></i>
                                                {house.address}
                                            </p>
                                        </div>
                                        <div className="d-flex border-top p-2">
                                            <small className="flex-fill text-center border-end py-2">
                                                <i className="fa fa-ruler-combined me-2 color-primary"></i>
                                                {house.area} m²
                                            </small>
                                            <small className="flex-fill text-center border-end py-2">
                                                <i className="fa fa-bed me-2 color-primary"></i>
                                                {house.bedroom} Ngủ
                                            </small>
                                            <small className="flex-fill text-center py-2">
                                                <i className="fa fa-bath  me-2 color-primary"></i>
                                                {house.bathroom} Tắm
                                            </small>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                        :
                        <div className="text-center text-danger fs-5">
                            Không tìm thấy nhà phù hợp
                        </div>
                }
            </div>
            {totalPages > 0 &&
                <div className="mt-5 d-flex justify-content-center">
                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                onChange={changePage} color="primary"/>
                </div>
            }
        </div>
    )
};

export default HouseComponent;