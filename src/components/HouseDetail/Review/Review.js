import React, {useContext} from 'react';
import Comment from "../Comment/Comment";
import {Pagination} from "@mui/material";
import {HouseDetailContext} from "../HouseDetail";

const Review = () => {
    const {reviews, changePage} = useContext(HouseDetailContext);
    return (
        <div className="row">
            <div className="col-md-6" style={{minHeight: '620px'}}>
                <h4 className="mb-4">Nhận xét:</h4>
                <Comment/>
            </div>
            <div className="col-12 mt-3 d-flex justify-content-center">
                <Pagination count={reviews.totalPages} variant="outlined" shape="rounded"
                            onChange={changePage} color="primary"/>
            </div>
        </div>
    );
};

export default Review;