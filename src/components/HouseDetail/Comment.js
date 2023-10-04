import React, {useContext} from 'react';
import {formatDate} from "../../service/format";
import {HouseDetailContext} from "./HouseDetail";
import _ from 'lodash';
import StarsReview from "./StarsReview";

const Comment = () => {
    const {reviews} = useContext(HouseDetailContext);
    return (
        <>
            {!_.isEmpty(reviews) && reviews.map(review => (
                <div className="d-flex align-items-start mb-4" key={review.id}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt=""
                         className="img-fluid me-3 mt-1"
                         style={{width: '45px'}}/>
                    <div className="flex-grow-1">
                        <h6>{review.booking?.account.username}<small><i
                            className="fw-normal ms-1">({formatDate(review.createAt)})</i></small></h6>
                        <div className="text-warning mb-2">
                            <StarsReview rating={review.rating}/>
                        </div>
                        <p>{review.comment}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Comment;