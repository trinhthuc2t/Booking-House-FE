import React, {createContext, useEffect, useState} from 'react';
import {formatCurrency} from "../../service/format";
import StarsReview from "./StarsReview";
import Description from "./Description";
import Review from "./Review";
import './houseDetail.scss';
import Facility from "./Facility";
import {getHouseById} from "../../service/houseService";
import {avgRatingByHouseId, getAllReviewsByHouseId} from "../../service/reviewService";
import {getAllImagesByHouseId} from "../../service/imageService";
import _ from 'lodash';
import {useParams} from "react-router-dom";
import Images from "./Images";

export const HouseDetailContext = createContext();

const HouseDetail = () => {
    const [showDesc, setShowDesc] = useState('desc');
    const [house, setHouse] = useState({});
    const [reviews, setReviews] = useState([]);
    const [images, setImages] = useState([]);
    const [avgRating, setAvgRating] = useState(0);

    const {houseId} = useParams();

    useEffect(() => {
        getHouseById(houseId).then(response => {
            setHouse(response.data);
        }).catch(error => {
            console.log(error);
        })

        getAllReviewsByHouseId(houseId).then(response => {
            setReviews(response.data);
        }).catch(error => {
            console.log(error);
        })

        getAllImagesByHouseId(houseId).then(response => {
            setImages(response.data);
        }).catch(error => {
            console.log(error);
        })

        avgRatingByHouseId(houseId).then(response => {
            setAvgRating(response.data);
        }).catch(error => {
            console.log(error);
        })

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    return (
        <HouseDetailContext.Provider value={{house, reviews}}>
            <div className="container-fluid py-5 container-house-detail">
                <div className="row px-xl-5">
                    <div className="col-lg-6 pb-5">
                        {!_.isEmpty(images) &&
                            <Images images={images}/>
                        }
                    </div>

                    <div className="col-lg-5 ms-5 pb-5">
                        <h3 className="fw-semibold">{house.name}</h3>
                        <div className="d-flex align-items-center mb-3">
                            <div className="me-2 star-review text-warning d-flex align-items-center">
                                <span
                                    className={`fw-semibold me-2 fs-5 ${avgRating ? "" : "d-none"}`}>{avgRating}</span>
                                <StarsReview rating={avgRating}/>
                            </div>
                            <small>({reviews.length} nhận xét)</small>
                        </div>
                        <h3 className="fw-normal mb-4 text-danger">
                            {formatCurrency(house.price - house.price * house.sale / 100)} / ngày
                            {house.sale ?
                                <>
                                    <span className="text-muted fs-5 ms-3">
                                         <del>{formatCurrency(house.price)}</del>
                                    </span>
                                    <small className="ms-3 bg-danger rounded text-white fs-6">
                                        -{house.sale}%
                                    </small>
                                </>
                                :
                                null
                            }
                        </h3>
                        <div className="d-flex">
                            <p className="me-4"><i className="fa-solid fa-bed me-2"></i>{house.bedroom} phòng ngủ</p>
                            <p><i className="fa-solid fa-bath me-3"></i>{house.bathroom} phòng tắm</p>
                        </div>

                        <p className="mb-2">Địa chỉ: {house.address}</p>
                        <p className="mb-2">
                            Chủ nhà: {house.owner?.username}
                        </p>

                        <p className="mb-2">
                            Trạng thái: {house.status}
                        </p>

                        <div className="d-flex align-items-center mb-4 pt-2">
                            <a href="" className="btn btn-danger px-3 py-2 btn-buy">
                                <i className="bi bi-cart-plus me-2"></i>Thuê ngay
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row px-xl-5">
                    <div className="col">
                        <div className="nav nav-tabs justify-content-center border-bottom-gray mb-4">
                    <span className={`nav-item nav-link ${showDesc === 'desc' ? 'active' : ''}`}
                          onClick={() => setShowDesc('desc')}>Mô tả</span>
                            <span className={`nav-item nav-link ${showDesc === 'facility' ? 'active' : ''}`}
                                  onClick={() => setShowDesc('facility')}>Tiện ích</span>
                            <span className={`nav-item nav-link ${showDesc === 'review' ? 'active' : ''}`}
                                  onClick={() => setShowDesc('review')}>Nhận xét ({reviews.length})</span>
                        </div>
                        <div className="tab-content">
                            {showDesc === 'desc' ?
                                <Description/>
                                :
                                showDesc === 'facility' ?
                                    <Facility/>
                                    :
                                    < Review/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </HouseDetailContext.Provider>
    );
};

export default HouseDetail;