import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function ListBooking() {
    const [bookings, setBookings] = useState([])
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
    return (
        <>
            {bookings.map(b => {
                return (
                    <div className="container">
                        <h4>Lịch đặt thuê</h4>
                        <table>
                            <thead>
                            <tr>
                                <th>Thời gian thuê</th>
                                <th>Tên ngôi nhà</th>
                                <th>Tên khách hàng</th>
                                <th>Tổng đơn</th>
                                <th>Trạng thái đơn</th>
                                <th>Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{booking.startTime}</td>
                                    <td>{booking.house.name}</td>
                                    <td>{booking.account.firstname + " " + booking.account.lastname}</td>
                                    <td>{booking.total}</td>
                                    <td>{booking.status}</td>
                                    <td>
                                       <Link to={"/booking/checkin/" + booking.id}><button>Check in</button></Link>
                                    </td>
                                    <td>
                                        <Link to={"/booking/checkout/" + booking.id}><button>Check out</button></Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </>)
}


export default ListBooking