import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import _ from "lodash";
import {formatCurrency} from "../../../service/format";
import {Pagination} from "@mui/material";
import {useSelector} from "react-redux";
import bookingsService from "../../../service/BookingsService";

const SearchBooking = () => {

    const [status, setStatus] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [bookings, setBookings] = useState([]);
    const account = useSelector(state => state.account);
    const changePage = (e, value) => {
        setCurrentPage(value)
    }


    const getAllBookingByOwnerId = (id) => {
        bookingsService.getAllBookingByOwnerId(id)
            .then((booking) => {
                setBookings(booking.content);
                setTotalPages(booking.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        getAllBookingByOwnerId(account.id, currentPage - 1);
        // window.scrollTo({
        //     top: 0,
        //     behavior: "smooth"
        // })
    }, [currentPage, nameSearch])
    const checkStatusBooking = (bookingCheck) => {

        if (bookingCheck.status === "Chờ nhận phòng") {
            return (
                <div className={'d-flex justify-content-between'}>
                    <div className="btn">
                        <Link to={"/owner/checkin/" + bookingCheck.id}>
                            <button className="btn border border-primary text-primary" style={{width: 100}}>Check in
                            </button>
                        </Link>
                    </div>
                    <div className="btn">
                        <Link to={"/owner/cancel/" + bookingCheck.id}>
                            <button className="btn border border-danger text-danger" style={{width: 80}}>Hủy</button>
                        </Link>
                    </div>
                </div>
            )
        } else if (bookingCheck.status === "Đã huỷ") {
            return (
                <div className="mb-3" style={{color: "red"}}>
                    <b>{bookingCheck.status}</b>
                </div>
            )
        } else if (bookingCheck.status === "Đang ở") {
            return (
                <div className="mb-3">
                    <Link to={"/owner/checkin/" + bookingCheck.id}>
                        <button className="btn border border-primary text-primary" style={{width: 100}}>Check out
                        </button>
                    </Link>
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
                        <div className="col-md-4">
                            <select className="form-select py-2 border-0" value={status}>
                                <option value="">Tất cả</option>
                                <option value="Đang trống">Đang trống</option>
                                <option value="Đang thuê">Đang thuê</option>
                                <option value="Đang sửa">Đang sửa</option>
                            </select>
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
                        <th>Tên khác hàng</th>
                        <th style={{minWidth: '130px'}}>Tổng đơn</th>
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
                                                    {b.house.address}
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
                                        <b>{(b.startTime)}</b>
                                    </td>
                                    <td className="mb-3">
                                        <b>{(b.endTime)}</b>
                                    </td>
                                    <td className="mb-3">
                                        <b>{`${b.account.firstname} ${b.account.lastname}`}</b>
                                    </td>
                                    <td className="mb-3">
                                        <b>{formatCurrency(b.total)}</b>
                                    </td>


                                    <td className="mb-3" style={{width: '180px'}}>
                                        {checkStatusBooking(b)}
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr align="center">
                            <td colSpan="5" className="pt-3 fs-5 text-danger">Danh sách trống</td>
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