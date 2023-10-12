import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import _ from 'lodash';
import BookingService from "../../service/BookingService";
import {formatCurrency} from "../../service/format";
import {Pagination} from "@mui/material";
import {toast} from "react-toastify";

const RentalHistory = () => {
    const account = useSelector(state => state.account);
    const [rentalList, setRentalList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [load ,setLoad] = useState(false);
    const [booking , setBooking] = useState({});
    useEffect(() => {
        getRentalList(account.id, currentPage - 1);
    }, [currentPage] )

    useEffect(() => {
        getRentalList(account.id, currentPage - 1);
        setLoad(false);
    },  [load])
    const getRentalList = (id, currentPage) => {
        BookingService.getHistoryByAccount(id, currentPage).then((response) => {
            console.log(response.data);
            var result = response.data.content;

            for (let i = 0; i < result.length; i++) {
                result[i].startTime = convertDateFormat(result[i].startTime);
                result[i].endTime = convertDateFormat(result[i].endTime);

            }
            console.log(new Date().getDate() - result[0].startTime.split('-')[0]);
            setRentalList(result);
            setTotalPages(response.data.totalPages);
        }).catch(function (err) {
            console.log(err);
        })
    }
    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const convertDateFormat = (input) => {
        let parts = input.split('T');
        let datePart = parts[0];
        let dateSegments = datePart.split('-');
        let newDate = `${dateSegments[2]}-${dateSegments[1]}-${dateSegments[0]}`;
        return `${newDate}`
    }
    const cancelBooking = (item) => {
        BookingService.cancelBooking(item.id).then((response) => {
            console.log(response);
            toast.success(response, {position: "top-center", autoClose: 2000,});
            setLoad(true);
        }).catch(function (err) {
            console.log(err);
        })
    }

    const checkBookingStatus = (item) => {

        var s = item.startTime.getMilliseconds();
        return <div>
            {s}
        </div>
      /*  if (item.status === "Đã hủy") {
            return null;
        }else if(item.startTime.split('-')[2] === new Date().getFullYear()  ) {

            if (item.startTime.split('-')[1] === new Date().getMonth() + 1 ) {

            }
            return (
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" className={'btn btn-danger'} onClick={() =>{
                    setBooking(item);
                }}>Hủy thuê</button>
            )
        }*/ /*else if (item.startTime.split('-')[0] - new Date().getDate() > 1 ) {
            return (
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" className={'btn btn-danger'} onClick={() =>{
                    setBooking(item);
                }}>Hủy thuê</button>
            )
        }*/
    }


    return (
        <div className={'col-9'}>
            {!_.isEmpty(rentalList) &&
                <div>
                    <div className={'text-center'}>
                        <h4>Lịch sử thuê nhà</h4>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Tên ngôi nhà</th>
                            <th scope="col">Địa chỉ </th>
                            <th scope="col">Ngày thuê nhà</th>
                            <th scope="col">Ngày trả nhà</th>
                            <th scope="col">Tổng đơn</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rentalList.map((item, ind) => {
                            return (
                                <tr key={ind}>
                                    <th scope="row">{item.house?.name}</th>
                                    <td>{item.house?.province}</td>
                                    <td>{item.startTime}</td>
                                    <td>{item.endTime}</td>
                                    <td>{formatCurrency(item.total)}</td>
                                    <td>{item.status === "Đã hủy" ? <span className={'text-danger'}>{item.status}</span> : <span >{item.status}</span>}</td>
                                    <td>
                                        {checkBookingStatus(item)}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <span className={'text-danger'}>* Lưu ý : Bạn chỉ có thể hủy thuê nhà trước ngày thuê nhà ít nhất 2 ngày. </span>
                    <div className="col-12 mt-5 d-flex justify-content-center">
                        <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                    onChange={changePage} color="primary"/>
                    </div>
                </div>

            }
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Xác nhận hủy thuê nhà</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <p style={{color : "red"}}>Bạn chắc chắn muốn hủy thuê nhà</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                                cancelBooking(booking);
                            }}>Xác nhận hủy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
        ;
};

export default RentalHistory;