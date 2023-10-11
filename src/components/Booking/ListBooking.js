import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import _ from "lodash";
import {formatCurrency} from "../../service/format";
import {Pagination} from "@mui/material";

function ListBooking() {
    const [bookings, setBookings] = useState([])
    const [totalPages, changePage] = useState(0)
    useEffect(() => {
        axios.get("http://localhost:8080/api/bookings/list")
            .then(res => {
                console.log(res.data)
                setBookings(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const deleteBooking = (id) => {
        axios.post("http://localhost:8080/api/bookings/delete/" + id)
            .then((res) => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    }
    return (
        <div className="col-9">
            <h3 className="text-uppercase text-center mb-5">Lịch đặt thuê</h3>
            <div className="mb-3 py-4 px-3"
                 style={{backgroundColor: "rgb(0,185,142)"}}>
                <table className="table">
                    <thead>
                    <tr align="center" style={{fontSize: '20px'}}>
                        <th>STT</th>
                        <th>Nhà</th>
                        <th style={{minWidth: '130px'}}>Lịch thuê</th>
                        <th style={{width: '150px'}}>Trạng thái</th>
                        <th style={{width: '150px'}}>Hành động</th>
                    </tr>
                    </thead>
                    <tbody style={{verticalAlign: 'middle'}}>
                    {!_.isEmpty(bookings) ? bookings.map((booking, index) => {
                            return (
                                <tr key={booking.id} align="center">
                                    <td>
                                        <h5>{index + 1}</h5>
                                    </td>
                                    <td>
                                        <div className="nav-link d-flex align-items-center">
                                            <img className="flex-shrink-0 img-fluid border rounded"
                                                 src={booking.thumbnail} alt=""
                                                 style={{width: 80, height: 80}}/>
                                            <div className="d-flex flex-column text-start ps-4">
                                                <h5 className="text-truncate">{booking.house.name}</h5>
                                                <div className="text-truncate me-3">
                                                    {booking.account.firstname + booking.account.lastname}
                                                </div>
                                                <div className="text-truncate">
                                                    {formatCurrency(booking.total)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="mb-3">
                                        <div>
                                            <p>Bắt đầu: {booking.startTime}</p>
                                            <p>Kết thúc: {booking.endTime}</p>
                                        </div>
                                    </td>
                                    <td className="mb-3">
                                        {booking.status}
                                    </td>

                                    <td className="mb-3">
                                        {booking.status === "Chờ nhận phòng" && (
                                            <Link to={"/booking/checkin/" + booking.id}>
                                                <button className="btn"
                                                        style={{backgroundColor: "rgb(0,185,142)", color: "white"}}>Check in
                                                </button>
                                            </Link>
                                        )}
                                        {booking.status === "Đang ở" && (
                                            <Link to={"/booking/checkout/" + booking.id}>
                                                <button className="btn"
                                                        style={{backgroundColor: "rgb(0,185,142)", color: "white"}}>Check
                                                    out
                                                </button>
                                            </Link>
                                        )}
                                        {booking.status === "Đã trả phòng" && (
                                            <button onClick={() => {
                                                deleteBooking(booking.id)
                                            }} className="btn"
                                                    style={{backgroundColor: "rgb(0,185,142)", color: "white"}}>Xoá</button>
                                        )}
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

    )
}


export default ListBooking