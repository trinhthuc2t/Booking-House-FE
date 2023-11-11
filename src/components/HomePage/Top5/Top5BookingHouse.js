import React, {useEffect, useState} from "react";
import axios from "axios";
import _ from "lodash";
import {Link} from "react-router-dom";
import {formatCurrency} from "../../../service/format";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import {Autoplay, Pagination} from 'swiper/modules';

function Top5BookingHouse() {
    const [houses, setHouses] = useState([])
    useEffect(() => {
        axios.get(`http://54.254.46.3:8080/api/houses/top5`)
            .then(res => {
                setHouses(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className="mt-5 container-top5 text-center">
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    !_.isEmpty(houses) && houses.map(house => {
                        return (
                            <div className="col-lg-4 col-md-6" key={house.id}>
                                <SwiperSlide>
                                    <div className="house-item border rounded overflow-hidden"
                                         style={{height: '500px', textAlign: 'center', background: '#eaeaea'}}>
                                        <Link to={`/house-detail/${house.id}`} className="nav-link">
                                            <div className="position-relative overflow-hidden">
                                                <div>
                                                    <img height={300} width={"100%"} src={house.thumbnail}
                                                         alt=""/>
                                                </div>
                                            </div>
                                            <div className="p-3 pb-0">
                                                <h4 className="text-center text-truncate">{house.name}</h4>
                                                <h5 className="color-primary text-center">
                                                    {formatCurrency(house.price - house.price * house.sale / 100)} /
                                                    ngày
                                                    {house.sale ?
                                                        <del className="text-secondary ms-3 fs-6">
                                                            {formatCurrency(house.price)}
                                                        </del>
                                                        :
                                                        null
                                                    }
                                                </h5>
                                                <p className="text-truncate mt-3">
                                                    <i className="fa fa-map-marker-alt me-2 color-primary"></i>
                                                    {house.address}
                                                </p>
                                            </div>
                                            <div className="d-flex border-top p-2 mt-3">
                                                <small className="flex-fill text-center border-end py-2">
                                                    <i className="fa fa-ruler-combined me-2 color-primary"></i>
                                                    {house.area} m²
                                                </small>
                                                <small className="flex-fill text-center border-end py-2">
                                                    <i className="fa fa-bed me-2 color-primary"></i>
                                                    {house.bedroom} Ngủ
                                                </small>
                                                <small className="flex-fill text-center py-2">
                                                    <i className="fa fa-bath me-2 color-primary"></i>
                                                    {house.bathroom} Tắm
                                                </small>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            </div>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

export default Top5BookingHouse