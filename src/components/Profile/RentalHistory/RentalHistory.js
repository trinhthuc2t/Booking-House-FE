import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import _ from 'lodash';
import BookingService from "../../../service/BookingService";
import {convertDateFormat, formatCurrency} from "../../../service/format";
import {CircularProgress, Pagination} from "@mui/material";
import Swal from "sweetalert2";
import {Button, Modal} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {reviewSchema} from "../../../validate/validate";
import {getAllReviewsByAccountId} from "../../../service/reviewService";
import {format} from "date-fns";
import {saveNotify} from "../../../service/notifyService";
import {WebSocketContext} from "../../ChatBox/WebSocketProvider";

const RentalHistory = () => {
        const account = useSelector(state => state.account);
        const [rentalList, setRentalList] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);
        const [load, setLoad] = useState(false);
        const [showReviewModal, setShowReviewModal] = useState(false);
        const [goldStar, setGoldStar] = useState([1, 2, 3, 4, 5]);
        const [booking, setBooking] = useState({});
        const [reviews, setReviews] = useState([]);
        const [isProgressing, setIsProgressing] = useState(false);
        const {sendNotify} = useContext(WebSocketContext);
        const {unreadNotify, toggleStatus} = useSelector(state => state);

    const [houseName , setHouseName] = useState('');
    const [status , setStatus] = useState('');
    const [startTime , setStartTime] = useState(null);
    const [endTime , setEndTime] = useState(null);
    const [localStartTime , setLocalStartTime] = useState(null);
    const [localEndTime , setLocalEndTime] = useState(null);

        useEffect(() => {
            getRentalList(account.id, currentPage - 1);
        }, [currentPage])

        useEffect(() => {
            getRentalList(account.id, currentPage - 1);
            getAllReviewsByAccountId(account.id).then(response => {
                setReviews(response.data);
            }).catch(error => {
                console.log(error);
            })
        }, [load, unreadNotify, toggleStatus , houseName , status , localStartTime , localEndTime])


    const handleHouseName = (e) => {
        let {value} = e.target;
        console.log(value);
        setHouseName(value);
    }

    const changeDate = (dayValue) => {
        const date = dayValue.split("-");
        const year = parseInt(date[0]);
        const month = parseInt(date[1]);
        const day = parseInt(date[2]);

        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            const localDateTime = new Date(year, month - 1, day);
            localDateTime.setMinutes(0);
            localDateTime.setSeconds(0);

            return localDateTime.toISOString().slice(0, 16);
        } else {
            return "";
        }
    }
    const handleStartTime = (e) => {
        console.log();
        setStartTime(e.target.value);
        setLocalStartTime(changeDate(e.target.value));
    }

    const handleEndTime = (e) => {
        console.log(e.target.value);
        setEndTime(e.target.value);
        setLocalEndTime(changeDate(e.target.value))
    }
        const getRentalList = (id, currentPage) => {
            let booking = {
                houseName : houseName,
                status : status,
                startTime : localStartTime ,
                endTime : localEndTime
            };
            BookingService.getHistoryByAccount(id, currentPage , booking).then((response) => {
                const result = response.data.content;
                setRentalList(result);
                setTotalPages(response.data.totalPages);
            }).catch(function (err) {
                console.log(err);
            })
        }
        const changePage = (e, value) => {
            setCurrentPage(value);
        }

        const cancelBooking = (item) => {
            Swal.fire({
                title: 'Nhập lý do hủy thuê',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                cancelButtonText: 'Đóng',
                confirmButtonText: 'Gửi',
                preConfirm: (value) => {
                    if (!value) {
                        Swal.showValidationMessage('Vui lòng không để trống')
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsProgressing(true);
                    BookingService.cancelBooking(item.id, {message: result.value}).then((response) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Hủy lịch thuê thành công !',
                            showConfirmButton: false,
                            timer: 1500
                        }).then();
                        setIsProgressing(false);
                        setLoad(!load);
                        const from = format(new Date(item.startTime), "dd/MM/yyyy");
                        const to = format(new Date(item.endTime), "dd/MM/yyyy");
                        handleSendNotify(account, item.house.owner.id, `${account.username} đã hủy lịch thuê ngôi nhà ${item.house.name}. Lịch đặt: ${from} - ${to}`, 'profile/houses-owner-booking')
                    }).catch(function (err) {
                        console.log(err);
                        setIsProgressing(false);
                    })
                }
            })
        }

        const showCancelBookingConfirm = (booking) => {
            if (new Date(booking.startTime) - new Date() > (1000 * 60 * 60 * 24)) {
                Swal.fire({
                    title: 'Bạn chắc chắn muốn hủy thuê nhà?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Đóng',
                }).then((result) => {
                    if (result.isConfirmed) {
                        cancelBooking(booking);
                    }
                })
            } else if (new Date(booking.startTime) - new Date() < (1000 * 60 * 60 * 24)) {
                Swal.fire({
                    title: 'Thời gian hủy nhỏ hơn 1 ngày tính tới ngày thuê nhà, bạn sẽ chịu khoản phí 10% tiền thuê nhà',
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Đóng',
                }).then((result) => {
                    if (result.isConfirmed) {
                        cancelBooking(booking);
                    }
                })
            }
        }

        const showReviewForm = (booking) => {
            setShowReviewModal(true);
            setBooking(booking);
            setGoldStar([1, 2, 3, 4, 5]);
        }

        const handleReview = (values) => {
            const data = {
                ...values,
                booking,
                rating: Math.max(...goldStar)
            };
            BookingService.createReview(data).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Viết đánh giá thành công !',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
                setShowReviewModal(false);
                setLoad(!load);
                const house = response.data.booking.house;
                handleSendNotify(account, house.owner.id, `${account.username} đã bình luận về ngôi nhà ${house.name}.`, `house-detail/${house.id}`)
            }).catch(function (err) {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Viết đánh giá thất bại !',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
            })
        }
        const checkBookingStatus = (item) => {
            if (item.status === "Đã hủy") {
                return null;
            } else if ((new Date(item.startTime) - new Date() > (1000 * 60 * 60 * 24))
                && item.status === 'Chờ nhận phòng') {
                return (
                    <button className='btn btn-danger'
                            onClick={() => showCancelBookingConfirm(item)}>
                        Hủy thuê
                    </button>
                )
            } else if (item.status === "Đã trả phòng") {
                const index = reviews.findIndex(review => review.booking.id === item.id);
                if (index < 0)
                    return (
                        <button className='btn border-primary text-primary'
                                onClick={() => showReviewForm(item)}>
                            Đánh giá
                        </button>
                    )
            }
            else if ((new Date(item.startTime) - new Date() < (1000 * 60 * 60 * 24))
                && item.status === 'Chờ xác nhận') {
                return (
                    <button className='btn btn-danger'
                            onClick={() => showCancelBookingConfirm(item)}>
                        Hủy thuê
                    </button>
                )
            }
        }

        const handleSendNotify = (accountLogin, receiverId, message, navigate) => {
            const data = {
                sender: accountLogin,
                receiver: {id: receiverId},
                message,
                navigate
            }
            saveNotify(data).then(response => {
                sendNotify(response.data);
            }).catch(error => {
                console.log(error)
            })
        }

        return (
            <div className='col-9'>
                <div>
                    <h3 className="text-uppercase text-center mb-4">Lịch sử thuê nhà</h3>
                    <div className="mb-3 py-4 px-3"
                         style={{backgroundColor: "rgb(0,185,142)"}}>
                        <div className="row g-2">
                            <div className="col-md-3">
                                <select className="form-select py-2 border-0" value={status} onChange={(e)=>{
                                    setStatus(e.target.value)
                                }}
                                        style={{minWidth: '200px'}}>
                                    <option value="">Tất cả</option>
                                    <option value="Chờ nhận phòng">Chờ nhận phòng</option>
                                    <option value="Đã trả phòng">Đã trả phòng</option>
                                    <option value="Đã hủy">Đã hủy</option>
                                    <option value="Đang ở">Đang ở</option>
                                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                                </select>
                            </div>

                            <div className="col-md-5">
                                <input type="text" className="form-control border-0 py-2" placeholder="Nhập từ khóa tìm kiếm"
                                       onInput={handleHouseName} name="houseName" value={houseName}/>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <input type="date" className="form-control" name="startTime" onChange={handleStartTime}   value={startTime} />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <input type="date" className="form-control" name="endTime" onChange={handleEndTime} min={startTime} value={endTime}  />
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                        <tr align="center">
                            <th scope="col">STT</th>
                            <th scope="col">Tên ngôi nhà</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Ngày thuê nhà</th>
                            <th scope="col">Ngày trả nhà</th>
                            <th scope="col">Tổng đơn</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Hành động</th>
                        </tr>
                        </thead>
                        <tbody style={{verticalAlign: 'middle'}}>
                        {!_.isEmpty(rentalList) ? rentalList.map((item, index) => {
                                return (
                                    <tr key={item.id} align="center">
                                        <th style={{width: '40px'}}>{index + 1}</th>
                                        <th>{item.house?.name}</th>
                                        <td>{item.house?.province}</td>
                                        <td>{convertDateFormat(item.startTime)}</td>
                                        <td>{convertDateFormat(item.endTime)}</td>
                                        <td>{formatCurrency(item.total)}</td>
                                        <td>{item.status === "Đã hủy" ?
                                            <span className={'text-danger'}>{item.status}</span> :
                                            <span>{item.status}</span>}</td>
                                        <td>
                                            {checkBookingStatus(item)}
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr align="center">
                                <td colSpan="8" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                            </tr>
                        }
                        </tbody>
                    </table>
                    <span className={'text-danger'}>* Lưu ý :Nếu hủy thuê nhà trước ngày thuê nhà 1 ngày , bạn sẽ phải chịu một khoản phí bằng 50% tiền thuê nhà</span>
                    {!_.isEmpty(rentalList) ?
                        <div className="col-12 mt-5 d-flex justify-content-center">
                            <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                        onChange={changePage} color="primary"/>
                        </div>
                        :
                        null
                    }
                </div>

                <Modal
                    show={showReviewModal}
                    onHide={() => setShowReviewModal(false)}
                >
                    <Formik
                        initialValues={{
                            comment: ""
                        }}
                        validationSchema={reviewSchema}
                        onSubmit={(values) => {
                            handleReview(values);
                        }
                        }>
                        <Form>
                            <Modal.Header closeButton className="p-4">
                                <Modal.Title>Để lại đánh giá</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="px-4">
                                <div>
                                    <div className="d-flex my-3">
                                        <p className="mb-0 me-2">
                                            Đánh giá của bạn <span className="text-danger">*</span> :
                                        </p>
                                        <div className="star-review text-warning" style={{cursor: 'pointer'}}>
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
                                    <div className="form-group mb-3">
                                        <label className="form-label" htmlFor="comment">
                                            Nhận xét của bạn <span className="text-danger">*</span>
                                        </label>
                                        <Field as="textarea" id="comment" cols="30" rows="5"
                                               className="form-control" name="comment"/>
                                        <ErrorMessage name="comment" className="text-danger" component="small"/>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="px-4">
                                <Button type="button" variant="secondary"
                                        onClick={() => setShowReviewModal(false)}
                                        style={{width: '70px'}}>
                                    Đóng
                                </Button>
                                <Button type="submit" variant="primary"
                                        onClick={handleReview}
                                        style={{width: '70px'}}>
                                    Gửi
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Formik>
                </Modal>
                {isProgressing &&
                    <div
                        className="w-100 h-100 position-fixed top-0 start-0 d-flex justify-content-center align-items-center"
                        style={{background: 'rgba(0,0,0,0.4)'}}>
                        <CircularProgress color="success"/>
                    </div>
                }
            </div>
        );
    }
;

export default RentalHistory;