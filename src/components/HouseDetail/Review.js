import React, {useState} from 'react';
import Comment from "./Comment";
const Review = () => {
    const [goldStar, setGoldStar] = useState([1, 2, 3, 4, 5]);
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h4 className="mb-4">Nhận xét:</h4>
                    <Comment/>
                </div>
                <div className="col-md-6">
                    <h4 className="mb-4">Để lại đánh giá</h4>
                    <small>Các trường bắt buộc được đánh dấu *</small>
                    <div className="d-flex my-3">
                        <p className="mb-0 me-2">Đánh giá của bạn * :</p>
                        <div className="star-review text-warning">
                            <i className="fa-solid fa-star px-1"
                               onMouseOver={() => setGoldStar([1])}>
                            </i>

                            <i className={`fa-solid fa-star px-1 ${goldStar.includes(2) ? '' : 'star-gray'}`}
                               onMouseOver={() => setGoldStar([1, 2])}>
                            </i>

                            <i className={`fa-solid fa-star px-1 ${goldStar.includes(3) ? '' : 'star-gray'}`}
                               onMouseOver={() => setGoldStar([1, 2, 3])}>
                            </i>

                            <i className={`fa-solid fa-star px-1 ${goldStar.includes(4) ? '' : 'star-gray'}`}
                               onMouseOver={() => setGoldStar([1, 2, 3, 4])}>
                            </i>

                            <i className={`fa-solid fa-star px-1 ${goldStar.includes(5) ? '' : 'star-gray'}`}
                               onMouseOver={() => setGoldStar([1, 2, 3, 4, 5])}>
                            </i>
                        </div>
                    </div>
                    <form>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="message">Nhận xét của bạn *</label>
                            <textarea id="message" cols="30" rows="5" className="form-control"></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="name">Tên của bạn *</label>
                            <input type="text" className="form-control" id="name"/>
                        </div>
                        <div className="form-group mb-0">
                            <input type="submit" value="Gửi"
                                   className="btn btn-primary px-3"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Review;