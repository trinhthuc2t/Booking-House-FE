import React, {useEffect, useState} from 'react';
import './top5.scss'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import _ from "lodash";
import {Link} from "react-router-dom";
import {formatCurrency} from "../service/format";
import axios from "axios";
const Top5 = () => {
    const [houses, setHouses] = useState([])
    useEffect(() => {
        axios.get("http://45.117.179.204:8080/api/houses/top5")
            .then(res => {
                setHouses(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className={'container-top5 container-fluid '}>
            <div className={'body-top5 g-4'}>
                <div id={'main'}>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {
                            !_.isEmpty(houses) && houses.map(house => {
                                return (
                                    <div className="col-lg-4 col-md-6 main-house" key={house.id} >
                                        <SwiperSlide className="house-item border rounded overflow-hidden" >
                                            <Link to={`/house-detail/${house.id}`} className="nav-link">
                                                <div className="position-relative overflow-hidden">
                                                    <div >
                                                        <img style={{height : '250px' , width : '100%'}} src={house.thumbnail} alt=""/>
                                                    </div>
                                                </div>
                                                <div className="p-3 pb-0 ">
                                                    <h5 className=" text-center text-truncate">{house.name}</h5>
                                                    <h5 className="  color-primary text-center">
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
                                        </SwiperSlide>
                                    </div>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Top5;