import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import _ from "lodash";
import {formatCurrency} from "../../../service/format";
import {Pagination} from "@mui/material";
import {useSelector} from "react-redux";
import bookingsService from "../../../service/BookingsService";

const SearchBooking = () => {
    const currentDate = new Date().toISOString().substring(0, 10);
    const [selectedDateStart, setSelectedDateStart] = useState(currentDate);
    const [selectedDateEnd, setSelectedDateEnd] = useState(currentDate);
    const [status, setStatus] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [bookings, setBookings] = useState([]);
    const account = useSelector(state => state.account);
    const [yearStart, setYearStart] = useState(0);
    const [monthStart, setMonthStart] = useState(0);
    const [dayStart, setDayStart] = useState(0);
    const [yearEnd, setYearEnd] = useState(0);
    const [monthEnd, setMonthEnd] = useState(0);
    const [dayEnd, setDayEnd] = useState(0);
    const changePage = (e, value) => {
        setCurrentPage(value)
    }
    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setSelectedDateStart(selectedDate)
        const dateParts = selectedDate.split('-');
        setYearStart(parseInt(dateParts[0]))
        setMonthStart(parseInt(dateParts[1]))
        setDayStart(parseInt(dateParts[2]))
    };
    const handleDateChangeEnd = (event) => {
        const selectedDate = event.target.value;
        setSelectedDateEnd(selectedDate)
        const dateParts = selectedDate.split('-');
        setYearEnd(parseInt(dateParts[0]))
        setMonthEnd(parseInt(dateParts[1]))
        setDayEnd(parseInt(dateParts[2]))
    };

    const handleNameSearch = (event) => {
        const nameSearch = event.target.value;
        setNameSearch(nameSearch);
    };
    const handleOptionChange = (event) => {
        const optionValue = event.target.value;
        setStatus(optionValue);
    };

    const searchBookingsByOwnerId = (ownerId,nameSearch,status,yearStart,monthStart,dayStart,yearEnd,monthEnd,dayEnd,currentPage) => {
        bookingsService.searchBookingsByOwnerId(ownerId,nameSearch,status,yearStart,monthStart,dayStart,yearEnd,monthEnd,dayEnd,currentPage)
            .then((bookings) => {
                setBookings(bookings.content);
                setTotalPages(bookings.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });

    };


    useEffect(() => {
        searchBookingsByOwnerId(account.id,nameSearch,status,yearStart,monthStart,dayStart,yearEnd,monthEnd,dayEnd,currentPage-1)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, nameSearch,nameSearch,status,yearStart,yearStart,monthStart,dayStart,yearEnd,monthEnd,dayEnd])


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
                            </select>
                        </div>

                        <div className="col-md-6">
                            <input type="text" className="form-control border-0 py-2" placeholder="Nhập từ khóa tìm kiếm"
                                   name=""
                                   id="" value={nameSearch} onInput={handleNameSearch}/>
                        < /div>
                        <div className="col-2">
                            <div className="input-group">
                                <input type="date" className="form-control" value={selectedDateStart}
                                       onChange={handleDateChange}/>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="input-group">
                                <input type="date" className="form-control" value={selectedDateEnd}
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


                                    <td className="mb-3" style={{width : '180px'}}>
                                        {b.status === "Chờ nhận phòng" ?
                                            <div className={'d-flex justify-content-between'}>
                                                <div className="btn" >
                                                    <button className="btn border border-primary text-primary" style={{width:100}}>Xác nhận</button>
                                                </div>
                                                <div className="btn" >
                                                    <button className="btn border border-danger text-danger" style={{width:80}}>Hủy</button>
                                                </div>
                                            </div>

                                            : <div className="mb-3" style={{color: b.status === "Đã hủy" ? "red" : "blue"}}>
                                                <b>{b.status}</b>
                                            </div>}

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