import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import AdminTeam from "./AdminTeam";
import './home.scss';
import {Pagination} from "@mui/material";
import {getAllProvinces} from "../service/addressService";
import houseByIdService from "../service/HouseByIdService";

const HouseComponent = () => {
    const [provinces, setProvinces] = useState([]);
    const [houses, setHouses] = useState([]);
    const [page, setPage] = useState(3);


    const getAllHouse = (currentPage) => {
        houseByIdService.getAllHouse(currentPage)
            .then((houses) => {
                setHouses(houses.content);
                setPage(houses.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getAllProvinces().then(response => {
            setProvinces(response.data.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
       getAllHouse()
    }, [])
    return (
        <div className="container-home">
            <div className="container mb-5">
                <div id="slide-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#slide-carousel" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#slide-carousel" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#slide-carousel" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="3000">
                            <img
                                src="https://media-cdn.tripadvisor.com/media/photo-m/1280/14/d3/31/ed/veque-homestay-01.jpg"
                                className="img-thumbnail" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="3000">
                            <img src="https://dulichbavi.com/wp-content/uploads/2022/06/ST-Homestay-Ba-Vi-2.jpg"
                                 className="img-thumbnail" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="3000">
                            <img
                                src="https://go2joy.s3.ap-southeast-1.amazonaws.com/blog/wp-content/uploads/2022/03/26143040/sazi-homestay-ha-noi.jpg"
                                className="img-thumbnail" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#slide-carousel"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#slide-carousel"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className="container-fluid mb-5" style={{padding: "35px", backgroundColor: "rgb(0,185,142)"}}>
                <div className="container">
                    <div className="row g-2">
                        <div className="col-md-10">
                            <div className="row g-2">
                                <div className="col-md-4">
                                    <input type="text" className="form-control border-0 py-3"
                                           placeholder="Nhập từ khóa tìm kiếm"/>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select border-0 py-3">
                                        <option>Khoảng giá</option>
                                        <option value="1">Dưới 1.000.000 ₫</option>
                                        <option value="2">Từ 1.000.000 ₫ - 5.000.000 ₫</option>
                                        <option value="3">Trên 5.000.000 ₫</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select border-0 py-3">
                                        <option>Vị trí</option>
                                        {!_.isEmpty(provinces) && provinces.map(province => (
                                            <option key={province.ProvinceID}
                                                    value={province.ProvinceName}>
                                                {province.ProvinceName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-dark border-0 w-100 py-3">Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*Search End*/}


            {/*Property List Start*/}
            <div className="container py-5">
                <div className="container">
                    <div className="row g-4">
                        {/*map house*/}

                        {
                            houses.map(house=>{
                                {console.log(houses)}
                                return(
                                    <div className="col-lg-4 col-md-6">
                                        <div className="house-item border rounded overflow-hidden">
                                            <div className="position-relative overflow-hidden">
                                                <div>
                                                    <img className="img-fluid" src={house.thumbnail} alt=""/>
                                                </div>
                                            </div>
                                            <div className="p-4 pb-0">
                                                <h5 className="mb-2 text-center">{house.name}</h5>
                                                <h5 className=" mb-3 color-primary text-center">{house.newPrice} <del
                                                    className="text-secondary fs-6">{house.oldPrice}</del></h5>
                                                <p>
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
                                        </div>
                                    </div>

                                )
                        })
                        }

                        {/*map house*/}
                        <div className="col-12 mt-5 d-flex justify-content-center">
                            <Pagination count={page} size="large" variant="outlined" shape="rounded" color="primary"/>
                        </div>

                        <AdminTeam/>

                    </div>
                </div>

            </div>
        </div>
    )
};

export default HouseComponent;