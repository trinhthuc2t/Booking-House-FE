import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import _ from "lodash";
import {convertDateFormat, formatCurrency, getTotalDays} from "../../../service/format";
import {CircularProgress, Pagination} from "@mui/material";
import {useSelector} from "react-redux";
import BookingService from "../../../service/BookingService";
import Swal from "sweetalert2";
import {Button, Modal} from "react-bootstrap";
import {cancelBookingOwner} from "../../../service/ownerService";
import {saveNotify} from "../../../service/notifyService";
import {WebSocketContext} from "../../ChatBox/WebSocketProvider";
import {format} from "date-fns";

const SearchBooking = () => {
    const [selectedDateStart, setSelectedDateStart] = useState(null);
    const [selectedDateEnd, setSelectedDateEnd] = useState(null);
    const [valueDateStart, setValueDateStart] = useState(null);
    const [valueDateEnd, setValueDateEnd] = useState(null);
    const [status, setStatus] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [bookings, setBookings] = useState([]);
    const account = useSelector(state => state.account);
    const [isLoad, setIsLoad] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [bookingDetail, setBookingDetail] = useState({});
    const [isProgressing, setIsProgressing] = useState(false);
    const {sendNotify} = useContext(WebSocketContext);
    const unreadNotify = useSelector(state => state.unreadNotify);

    useEffect(() => {
        searchBookingsByOwnerId(account.id, nameSearch, status, selectedDateStart, selectedDateEnd, currentPage - 1)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, nameSearch, nameSearch, selectedDateStart, selectedDateEnd, status, isLoad, unreadNotify])

    const changePage = (e, value) => {
        setCurrentPage(value)
    }
    const changeDate = (selectedDate) => {
        const dateParts = selectedDate.split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);

        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            const dateTime = new Date(year, month - 1, day);
            dateTime.setMinutes(0);
            dateTime.setSeconds(0);

            return dateTime.toISOString().slice(0, 16);
        } else {
            return "";
        }
    }

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setValueDateStart(selectedDate)
        const formattedDatetime = changeDate(selectedDate);
        setSelectedDateStart(formattedDatetime);
    };

    const handleDateChangeEnd = (event) => {
        const selectedDate = event.target.value;
        setValueDateEnd(selectedDate)
        const formattedDatetime = changeDate(selectedDate);
        setSelectedDateEnd(formattedDatetime)
    };

    const handleNameSearch = (event) => {
        const nameSearch = event.target.value;
        setNameSearch(nameSearch);
    };
    const handleOptionChange = (event) => {
        const optionValue = event.target.value;
        setStatus(optionValue);
    };

    const searchBookingsByOwnerId = (ownerId, nameSearch, status, selectedDateStart, selectedDateEnd, currentPage) => {
        BookingService.searchBookingsByOwnerId(ownerId, nameSearch, status, selectedDateStart, selectedDateEnd, currentPage)
            .then((bookings) => {
                setBookings(bookings.data.content);
                setTotalPages(bookings.data.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCancelBooking = (booking) => {
        console.log(booking)
        Swal.fire({
            title: 'Bạn chắc chắn muốn hủy thuê nhà của khách?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
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
                        cancelBookingOwner(booking.id, {message: result.value})
                            .then((res) => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Hủy lịch thành công !',
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then();
                                setIsLoad(!isLoad);
                                setIsProgressing(false);
                                const from = format(new Date(booking.startTime), "dd/MM/yyyy");
                                const to = format(new Date(booking.endTime), "dd/MM/yyyy");
                                handleSendNotify(account, booking.account.id, `Chủ nhà đã hủy lịch thuê ngôi nhà ${booking.house.name}. Lịch đặt: ${from} - ${to}`, 'profile/rental-history');
                            })
                            .catch(err => {
                                console.log(err);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Hủy lịch thất bại !',
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then();
                                setIsProgressing(false);
                            });
                    }
                })
            }
        })
    }

    const handleCheckOutBooking = (booking) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn thay đổi?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                BookingService.checkoutBookingAdmin(booking.id)
                    .then((res) => {
                        setIsLoad(!isLoad);
                        Swal.fire({
                            icon: 'success',
                            title: 'Trạng thái đã được cập nhật thành công !',
                            showConfirmButton: false,
                            timer: 1000
                        }).then();
                        sendNotify({receiver: {id: booking.account.id}, message: 'Thay đổi trạng thái'});
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        })
    }

    const handleCheckInBooking = (booking) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn thay đổi?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                BookingService.checkinBookingAdmin(booking.id)
                    .then((res) => {
                        setIsLoad(!isLoad);
                        Swal.fire({
                            icon: 'success',
                            title: 'Trạng thái đã được cập nhật thành công !',
                            showConfirmButton: false,
                            timer: 1000
                        }).then();
                        sendNotify({receiver: {id: booking.account.id}, message: 'Thay đổi trạng thái'});
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        })
    }
    const waitOwnerConfirmBooking = (booking) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn xác nhận lịch thuê ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                setIsProgressing(true);
                BookingService.waitOwnerConfirmBooking(booking.id)
                    .then((res) => {
                        setIsLoad(!isLoad);
                        Swal.fire({
                            icon: 'success',
                            title: 'Xác nhận lịch thuê thành công !',
                            showConfirmButton: false,
                            timer: 1500
                        }).then();
                        setIsProgressing(false);
                        const from = format(new Date(booking.startTime), "dd/MM/yyyy");
                        const to = format(new Date(booking.endTime), "dd/MM/yyyy");
                        handleSendNotify(account, booking.account.id, `Chủ nhà đã xác nhận lịch thuê ngôi nhà ${booking.house.name}. Lịch đặt: ${from} - ${to}`, 'profile/rental-history');
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        })
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
    const checkStatusBooking = (bookingCheck) => {
        if (bookingCheck.status === "Chờ nhận phòng") {
            return (
                <div className={'d-flex justify-content-evenly'}>
                    <button onClick={() => handleCheckInBooking(bookingCheck)}
                            className="btn border border-primary text-primary" style={{width : '105px'}}>
                        Check in
                    </button>
                    <button className="btn border border-danger text-danger ms-2"
                            onClick={() => handleCancelBooking(bookingCheck)}>
                        Hủy
                    </button>
                    <button className="btn border-primary text-primary ms-2"
                            onClick={() => handleBookingDetail(bookingCheck)}>
                        Chi tiết
                    </button>
                </div>
            )
        } else if (bookingCheck.status === "Đang ở") {
            return (
                <div className={'d-flex justify-content-evenly'}>
                    <button className="btn border border-primary text-primary"
                            onClick={() => handleCheckOutBooking(bookingCheck)} style={{width : '105px'}}
                    >
                        Check out
                    </button>
                    <button className="btn border-primary text-primary ms-2"
                            onClick={() => handleBookingDetail(bookingCheck)}>
                        Chi tiết
                    </button>
                </div>


            )
        } else if (bookingCheck.status === "Chờ xác nhận") {
            return (
                <div className={'d-flex justify-content-evenly'}>
                    <button onClick={() => waitOwnerConfirmBooking(bookingCheck)}
                            className="btn border border-primary text-primary" style={{width : '105px'}}>
                        Chấp nhận
                    </button>
                    <button
                        className="btn border border-danger text-danger ms-2"
                        onClick={() => handleCancelBooking(bookingCheck)}
                    >
                        Hủy
                    </button>
                    <button className="btn border-primary text-primary ms-2"
                            onClick={() => handleBookingDetail(bookingCheck)}>
                        Chi tiết
                    </button>
                </div>
            )
        }else {
            return (
                   <button className="btn border-primary text-primary ms-2"
                           onClick={() => handleBookingDetail(bookingCheck)}>
                       Chi tiết
                   </button>
            )
        }

    }
    const handleBookingDetail = (booking) => {
        setBookingDetail(booking);
        setShowModal(true);
    }
    const showBookingStatus = (booking) => {
        switch (booking.status) {
            case 'Chờ xác nhận':
                return (
                    <b style={{color : 'blue'}}>Chờ xác nhận</b>
                );
            case 'Đã hủy' :
                return (
                    <b style={{color : 'red'}}>Đã hủy</b>
                );
            case 'Đã trả phòng' :
                return (
                    <b style={{color : 'green'}}>Đã trả phòng</b>
                );
            case 'Chờ nhận phòng' :
                return (
                    <b >Chờ nhận phòng</b>
                );
            case 'Đang ở' :
                return (
                    <b style={{color : 'darkorange'}}>Đang ở</b>
                )
        }
    }
    return (
        <div className="col-9">
            <div className="container-fluid">
                <h3 className="text-uppercase text-center mb-5">Lịch sử cho thuê nhà</h3>
                <div className="mb-3 py-4 px-3"
                     style={{backgroundColor: "rgb(0,185,142)"}}>
                    <div className="row g-2">
                        <div className="col-md-3">
                            <select className="form-select py-2 border-0" value={status}
                                    onChange={handleOptionChange} style={{minWidth: '200px'}}>
                                <option value="">Tất cả</option>
                                <option value="Chờ nhận phòng">Chờ nhận phòng</option>
                                <option value="Đã trả phòng">Đã trả phòng</option>
                                <option value="Đã hủy">Đã hủy</option>
                                <option value="Đang ở">Đang ở</option>
                                <option value="Chờ xác nhận">Chờ xác nhận</option>
                            </select>
                        </div>

                        <div className="col-md-5">
                            <input type="text" className="form-control border-0 py-2"
                                   placeholder="Nhập từ khóa tìm kiếm"
                                   name=""
                                   id="" value={nameSearch} onInput={handleNameSearch}/>
                        </div>
                        <div className="col-2">
                            <div className="input-group">
                                <input type="date" className="form-control" value={valueDateStart}
                                       onChange={handleDateChange}/>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="input-group">
                                <input type="date" className="form-control" value={valueDateEnd}
                                       onChange={handleDateChangeEnd}/>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table">
                    <thead>
                    <tr align="center">
                        <th>STT</th>
                        <th>Nhà</th>
                        <th>Ngày thuê</th>
                        <th>Ngày trả nhà</th>
                        <th >Trạng thái</th>
                        <th style={{width: '25%'}}>Hành động</th>
                    </tr>
                    </thead>
                    <tbody style={{verticalAlign: 'middle'}}>
                    {!_.isEmpty(bookings) ? bookings.map((b, index) => {
                            return (
                                <tr key={b.id} align="center">
                                    <td>
                                        <h5>{index + 1}</h5>
                                    </td>
                                    <td>
                                        <Link to={`/house-detail/${b.house?.id}`} className="nav-link d-flex align-items-center">
                                            <img className="flex-shrink-0 img-fluid border rounded"
                                                 src={b.house.thumbnail} alt=""
                                                 style={{width: 80, height: 80}}/>
                                            <div className="d-flex flex-column text-start ps-4">
                                                <h5 className="text-truncate">{b.house.name}</h5>
                                                <div className="text-truncate me-3"><i
                                                    className="fa fa-map-marker-alt me-2"
                                                    style={{color: "rgb(0,185,142)"}}></i>
                                                    {b.house.province}
                                                </div>
                                                <div className="text-truncate"><i
                                                    className="far fa-money-bill-alt me-2"
                                                    style={{color: "rgb(0,185,142)"}}></i>
                                                    {formatCurrency(b.house.price)}
                                                </div>
                                            </div>
                                        </Link>
                                    </td>

                                    <td>
                                        {convertDateFormat(b.startTime)}
                                    </td>
                                    <td>
                                        {convertDateFormat(b.endTime)}
                                    </td>

                                    <td style={{width: '180px'}}>
                                        {showBookingStatus(b)}
                                    </td>
                                    <td>
                                        <div className={'d-flex '}>
                                            {checkStatusBooking(b)}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr align="center">
                            <td colSpan="6" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                        </tr>
                    }
                    </tbody>
                </table>
                {!_.isEmpty(bookings) ?
                    <div className="col-12 mt-5 d-flex justify-content-center">
                        <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                    onChange={changePage} color="primary"/>
                    </div>
                    :
                    null
                }
            </div>

            <Modal
                size="lg"
                centered
                show={showModal}
                onHide={() => setShowModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Chi tiết lịch thuê
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!_.isEmpty(bookingDetail) &&
                        <div className="px-4">
                            <div className="row">
                                <div className="col-6">
                                    <h5 className="mb-3">Thông tin nhà cho thuê</h5>
                                    <p className="mb-2">
                                        <span className="fw-medium">Tên nhà:</span> {bookingDetail.house?.name}
                                    </p>
                                    <p className="mb-2">
                                        <span
                                            className="fw-medium">Chủ nhà:</span> {bookingDetail.house?.owner.username}
                                    </p>
                                    <p>
                                        <span className="fw-medium">Địa chỉ:</span> {bookingDetail.house?.address}
                                    </p>
                                    <p><span className="fw-medium">Ảnh:</span></p>
                                    <img src={bookingDetail.house?.thumbnail} alt="Chưa có avatar" height={200}
                                         width={200}/>
                                </div>
                                <div className="col-6">
                                    <h5 className="mb-3">Thông tin khách thuê</h5>
                                    <p className="mb-2">
                                        <span
                                            className="fw-medium">Tên tài khoản:</span> {bookingDetail.account?.username}
                                    </p>
                                    <p className="mb-2">
                                    <span
                                        className="fw-medium">Họ và tên:</span> {bookingDetail.account?.lastname} {bookingDetail.account?.firstname}
                                    </p>
                                    <p className="mb-2">
                                        <span className="fw-medium">Email:</span> {bookingDetail.account?.email}
                                    </p>
                                    <p className="mb-2">
                                        <span className="fw-medium">Địa chỉ:</span> {bookingDetail.account?.address}
                                    </p>
                                    <p className="mb-2">
                                        <span className="fw-medium">Số điện thoại:</span> {bookingDetail.account?.phone}
                                    </p>
                                    <p className="mb-2">
                                    <span
                                        className="fw-medium">Thời gian thuê: </span>
                                        {getTotalDays(new Date(bookingDetail.startTime), new Date(bookingDetail.endTime))} ngày
                                        (Từ {convertDateFormat(bookingDetail.startTime)} đến {convertDateFormat(bookingDetail.endTime)})
                                    </p>
                                    <p className="mb-2">
                                        <span
                                            className="fw-medium">Tổng tiền:</span> {formatCurrency(bookingDetail.total)}
                                    </p>
                                    <p className="mb-2">
                                        <span className="fw-medium">Trạng thái:</span> {bookingDetail.status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="py-2 px-3"
                            onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
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
};

export default SearchBooking;