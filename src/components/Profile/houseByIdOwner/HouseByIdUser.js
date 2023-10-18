import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import houseByIdService from "../../../service/HouseByIdService";
import {Pagination} from "@mui/material";
import {formatCurrency} from "../../../service/format";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import _ from 'lodash';

const HouseByIdUser = () => {
    const [status, setStatus] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [houses, setHouses] = useState([]);
    const [house, setHouse] = useState({});
    const account = useSelector(state => state.account);
    const changePage = (e, value) => {
        setCurrentPage(value)
    }

    const handleStatusChange = (house) => {
        const updatedHouse = {...house};

        Swal.fire({
            title: 'Bạn có chắc muốn thay đổi trạng thái không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, thay đổi!'
        }).then((result) => {
            if (result.isConfirmed) {
                updatedHouse.status = house.status === "Đang sửa" ? "Đang trống" : "Đang sửa";
                updateStatus(updatedHouse);
            }
        });
    };


    const updateStatus = (house) => {
        houseByIdService
            .updateStatusHouse(house.id, house.status)
            .then(() => {
                setHouse(house);

                Swal.fire({
                    icon: 'success',
                    title: 'Trạng thái đã được cập nhật thành công !',
                    showConfirmButton: false,
                    timer: 1000
                })
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra khi cập nhật trạng thái !',
                    showConfirmButton: false,
                    timer: 1000
                })
            });
    };


    const findByOwnerIdAndNameAndStatus = (id, nameSearch, status, currentPage) => {
        houseByIdService.findByOwnerIdAndNameAndStatus(id, nameSearch, status, currentPage)
            .then((houses) => {
                setHouses(houses.content);
                setTotalPages(houses.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleOptionChange = (event) => {
        const optionValue = event.target.value;
        setStatus(optionValue);
    };
    const handleNameSearch = (event) => {
        const nameSearch = event.target.value;
        setNameSearch(nameSearch);
    };

    useEffect(() => {
        findByOwnerIdAndNameAndStatus(account.id, nameSearch, status, currentPage - 1);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, house, status, nameSearch])


    return (
        <div className="col-9">
            <h3 className="text-uppercase text-center mb-5">Danh sách nhà cho thuê</h3>
            <div className="mb-3 py-4 px-3"
                 style={{backgroundColor: "rgb(0,185,142)"}}>
                <div className="row g-2">
                    <div className="col-md-4">
                        <select className="form-select py-2 border-0" value={status}
                                onChange={handleOptionChange}>
                            <option value="">Tất cả</option>
                            <option value="Đang trống">Đang trống</option>
                            <option value="Đang thuê">Đang thuê</option>
                            <option value="Đang sửa">Đang sửa</option>
                        </select>
                    </div>

                    <div className="col-md-8">
                        <input type="text" className="form-control border-0 py-2" placeholder="Nhập từ khóa tìm kiếm"
                               name=""
                               id="" value={nameSearch} onInput={handleNameSearch}/>
                    < /div>
                </div>
            </div>
            <Link to="/add-house" className="btn btn-lg btn-primary mb-3">Thêm mới nhà</Link>
            <table className="table">
                <thead>
                <tr align="center" style={{fontSize: '20px'}}>
                    <th>STT</th>
                    <th>Nhà</th>
                    <th style={{minWidth: '130px'}}>Doanh thu</th>
                    <th style={{width: '150px'}}>Trạng thái</th>
                    <th style={{minWidth: '150px'}}>Hành động</th>
                </tr>
                </thead>
                <tbody style={{verticalAlign: 'middle'}}>
                {!_.isEmpty(houses) ? houses.map((house, index) => {
                        return (
                            <tr key={house.id} align="center">
                                <td>
                                    <h5>{index + 1}</h5>
                                </td>
                                <td className="text-truncate">
                                    <Link to={`/house-detail/${house.id}`} className="nav-link d-flex align-items-center">
                                        <img className="flex-shrink-0 img-fluid border rounded"
                                             src={house.thumbnail} alt=""
                                             style={{width: 80, height: 80}}/>
                                        <div className="d-flex flex-column text-start ps-4">
                                            <h5 className="text-truncate">{house.name}</h5>
                                            <div className="me-3">
                                                <i className="fa fa-map-marker-alt me-2"
                                                style={{color: "rgb(0,185,142)"}}>
                                                </i>
                                                {house.province}
                                            </div>
                                            <div className="text-truncate"><i
                                                className="far fa-money-bill-alt me-2"
                                                style={{color: "rgb(0,185,142)"}}></i>
                                                {formatCurrency(house.price)}
                                            </div>
                                        </div>
                                    </Link>
                                </td>

                                <td className="mb-3">
                                    <b>{formatCurrency(house.revenue)}</b>
                                </td>
                                <td className="mb-3">
                                    {house.status === "Đang thuê" ? (
                                        <select
                                            disabled={true}
                                            className="form-select border border-primary text-primary"
                                            value={house.status}
                                            style={{minWidth: '180px'}}
                                            onChange={() => handleStatusChange(house)}
                                        >
                                            <option value="Đang trống">Đang trống</option>
                                            <option value="Đang thuê">Đang thuê</option>
                                            <option value="Đang sửa">Đang sửa</option>
                                        </select>

                                    ) : (
                                        <select
                                            className={`form-select border ${house.status === "Đang sửa" ? "border-danger text-danger" : "border-warning text-warning"}`}
                                            value={house.status}
                                            onChange={() => handleStatusChange(house)}
                                        >
                                            <option value="Đang trống">Đang trống</option>
                                            <option value="Đang sửa">Đang sửa</option>
                                        </select>
                                    )}
                                </td>

                                <td className="mb-3">
                                    <Link to={`/edit-house/${house.id}`} className="btn btn-house">
                                        Sửa thông tin
                                    </Link>
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
            {!_.isEmpty(houses) ?
                <div className="col-12 mt-5 d-flex justify-content-center">
                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                onChange={changePage} color="primary"/>
                </div>
                :
                null
            }
        </div>

    )
};

export default HouseByIdUser;