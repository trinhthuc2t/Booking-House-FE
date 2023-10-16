import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import _ from "lodash";
import {convertDateFormat, formatCurrency} from "../../../service/format";
import {Pagination} from "@mui/material";
import {useSelector} from "react-redux";
import BookingService from "../../../service/BookingService";
import Swal from "sweetalert2";

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

            const formattedDatetime = dateTime.toISOString().slice(0, 16);
            return formattedDatetime;
        } else {

            return "";
        }
    }

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setValueDateStart(selectedDate)
        const formattedDatetime = changeDate(selectedDate);
        setSelectedDateStart(formattedDatetime);
        console.log(selectedDate)

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

    const searchBookingsByOwnerId = (ownerId, nameSearch,status, selectedDateStart,selectedDateEnd, currentPage) => {
        BookingService.searchBookingsByOwnerId(ownerId, nameSearch, status, selectedDateStart,selectedDateEnd, currentPage)
            .then((bookings) => {
                setBookings(bookings.data.content);
                setTotalPages(bookings.data.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        searchBookingsByOwnerId(account.id, nameSearch, status, selectedDateStart,selectedDateEnd, currentPage - 1)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, nameSearch, nameSearch,selectedDateStart,selectedDateEnd, status, isLoad])

    const handleCancleBooking = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn hủy thuê nhà?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                BookingService.cancelBookingAdmin(id)
                    .then((res) => {
                        setIsLoad(!isLoad);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        })
    }

    const handleCheckOutBooking = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn thay đổi?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                BookingService.checkoutBookingAdmin(id)
                    .then((res) => {
                        setIsLoad(!isLoad);
                        Swal.fire({
                            icon: 'success',
                            title: 'Trạng thái đã được cập nhật thành công !',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        })
    }

    const handleCheckInBooking = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn thay đổi?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                BookingService.checkinBookingAdmin(id)
                    .then((res) => {
                        setIsLoad(!isLoad);
                        Swal.fire({
                            icon: 'success',
                            title: 'Trạng thái đã được cập nhật thành công !',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        })
    }
    const waitOwnerConfirmBooking = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn thay đổi?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                BookingService.waitOwnerConfirmBooking(id)
                    .then((res) => {
                        setIsLoad(!isLoad);
                        Swal.fire({
                            icon: 'success',
                            title: 'Trạng thái đã được cập nhật thành công !',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        })
    }
    const checkStatusBooking = (bookingCheck) => {
        if (bookingCheck.status === "Chờ nhận phòng") {
            return (
                <div className={'d-flex'}>
                    <button onClick={() => handleCheckInBooking(bookingCheck.id)}
                            className="btn border border-primary text-primary"
                            style={{width: 110}}>
                        Check in
                    </button>
                    <button
                        className="btn border border-danger text-danger ms-2"
                        onClick={() => handleCancleBooking(bookingCheck.id)}
                        style={{width: 90}}>
                        Hủy
                    </button>
                </div>
            )
        } else if (bookingCheck.status === "Đã hủy") {
            return (
                <div className="mb-3" style={{color: "red"}}>
                    <b  className="btn border border-danger text-danger" style={{width: 200}}>{bookingCheck.status}</b>
                </div>
            )
        } else if (bookingCheck.status === "Đang ở") {
            return (
                <button className="btn border border-primary text-primary"
                        onClick={() => handleCheckOutBooking(bookingCheck.id)}
                        style={{width: 200}}>
                    Check out
                </button>
            )
        }else if (bookingCheck.status === "Đã trả phòng") {
            return (
                <div className="mb-3" style={{color: "blue"}}>
                    <b className="btn border border-success text-success" style={{width: 200}}>{bookingCheck.status}</b>
                </div>
            )
        }else  {
            return (
                <div className={'d-flex'}>
                    <button onClick={() => waitOwnerConfirmBooking(bookingCheck.id)}
                            className="btn border border-primary text-primary"
                            style={{width: 110}}>
                        Chấp nhận
                    </button>
                    <button
                        className="btn border border-danger text-danger ms-2"
                        onClick={() => handleCancleBooking(bookingCheck.id)}
                        style={{width: 80}}>
                        Hủy
                    </button>
                </div>
            )

        }

    }


    return (
        <div className="col-9">
            <div className="container">
                <h3 className="text-uppercase text-center mb-5">Lịch sử cho thuê nhà</h3>
                <div className="mb-3 py-4 px-3"
                     style={{backgroundColor: "rgb(0,185,142)"}}>
                    <div className="row g-2">
                        <div className="col-md-2">
                            <select className="form-select py-2 border-0" value={status}
                                    onChange={handleOptionChange}>
                                <option value="">Tất cả</option>
                                <option value="Chờ nhận phòng">Chờ nhận phòng</option>
                                <option value="Đã trả phòng">Đã trả phòng</option>
                                <option value="Đã hủy">Đã hủy</option>
                                <option value="Đang ở">Đang ở</option>
                                <option value="Chờ xác nhận">Chờ xác nhận</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <input type="text" className="form-control border-0 py-2"
                                   placeholder="Nhập từ khóa tìm kiếm"
                                   name=""
                                   id="" value={nameSearch} onInput={handleNameSearch}/>
                        < /div>
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
                        <div className="col-md-8">

                        < /div>
                    </div>
                </div>

                <table className="table">
                    <thead>
                    <tr align="center" style={{fontSize: '20px'}}>
                        <th>STT</th>
                        <th>Nhà</th>
                        <th>Ngày thuê</th>
                        <th>Ngày trả nhà</th>
                        {/*<th>Tên khác hàng</th>
                        <th style={{minWidth: '130px'}}>Tổng đơn</th>*/}
                        <th style={{width: '150px'}}>Trạng thái</th>
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
                                        <Link to={`/house-detail/${b.id}`} className="nav-link d-flex align-items-center">
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

                                    <td className="mb-3">
                                        {convertDateFormat(b.startTime)}
                                    </td>
                                    <td className="mb-3">
                                        {convertDateFormat(b.endTime)}
                                    </td>
                                    {/*<td className="mb-3">
                                        {`${b.account.firstname} ${b.account.lastname}`}
                                    </td>
                                    <td className="mb-3">
                                        {formatCurrency(b.total)}
                                    </td>*/}

                                    <td className="mb-3" style={{width: '180px'}}>
                                        {checkStatusBooking(b)}
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
        </div>
    );
};

export default SearchBooking;