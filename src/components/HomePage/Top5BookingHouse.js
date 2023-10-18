import React, {useEffect, useState} from "react";
import axios from "axios";
import _ from "lodash";
import {Link} from "react-router-dom";
import {formatCurrency} from "../../service/format";
import { Carousel } from 'antd';
const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
function Top5BookingHouse() {
    const [houses, setHouses] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/api/houses/top5")
            .then(res => {
                setHouses(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className="container d-flex justify-content-center">
            <div className="row g-4" style={{width : '700px'}}>

                <Carousel autoplay>

                    {
                        !_.isEmpty(houses) && houses.map(house => {
                            return (
                                <div className="col-lg-4 col-md-6" key={house.id}>
                                    <div className="house-item border rounded overflow-hidden" style={contentStyle}>
                                        <Link to={`/house-detail/${house.id}`} className="nav-link">
                                            <div className="position-relative overflow-hidden">
                                                <div>
                                                    <img height={300} width={"100%"} src={house.thumbnail} alt=""/>
                                                </div>
                                            </div>
                                            <div className="p-3 pb-0">
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
                                    </div>
                                </div>
                            )
                        })
                    }
                </Carousel>


            </div>
        </div>

    )
}
export default Top5BookingHouse