import React, {useContext, useEffect, useState} from 'react';
import AccountService from "../../../service/AccountService";
import _ from 'lodash';
import Swal from "sweetalert2";
import {WebSocketContext} from "../../ChatBox/WebSocketProvider";
import {saveNotify} from "../../../service/notifyService";
import {useSelector} from "react-redux";

const ConfirmOwner = () => {
    const [listRegister, setListRegister] = useState([]);
    const [owner, setOwner] = useState({});
    const [load, setLoad] = useState(false);
    const {sendNotify, sendAdmin} = useContext(WebSocketContext);
    const {account, toggleStatus, unreadNotify} = useSelector(state => state);

    useEffect(() => {
        getListRegister();
    }, [load, toggleStatus, unreadNotify])
    const getListRegister = () => {
        AccountService.getListRegisterOwner().then((response) => {
            setListRegister(response.data);
        }).catch(function (err) {
            console.log(err);
        })
    }

    const handleAgree = (value) => {
        let data = {...value, status: "Đã xác nhận"};
        Swal.fire({
            title: `Bạn đồng để ${value.lastname} ${value.firstname} làm chủ nhà chứ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                AccountService.agreeRegister(data).then((response) => {
                    Swal.fire({
                        title: 'Xác nhận thành công !',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                    setLoad(!load);
                    handleSendNotify(account, value.account.id, 'Admin đã đồng ý cho bạn làm chủ nhà', 'profile/houses-owner');
                }).catch(function (err) {
                    console.log(err);
                })
            }
        })
    }

    const handleRefuse = (data) => {
        Swal.fire({
            title: `Bạn từ chối để ${data.lastname} ${data.firstname} làm chủ nhà?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                AccountService.refuseRegister(data.id).then((response) => {
                    Swal.fire({
                        title: 'Từ chối thành công !',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                    setLoad(!load);
                    handleSendNotify(account, data.account.id, 'Admin đã từ chối cho bạn làm chủ nhà', 'profile/register-owner');
                }).catch(function (err) {
                    console.log(err);
                })
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
            sendAdmin(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={'col-9'}>
            <h3 className="text-uppercase mb-4 text-center"> Danh sách đăng ký làm chủ nhà</h3>
            <table className="table">
                <thead>
                <tr className={'text-center'}>
                    <th>STT</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody style={{verticalAlign: 'middle'}}>
                {!_.isEmpty(listRegister) ? listRegister.map((item, index) => {
                        return <tr key={item.id} className={'text-center'}>
                            <th scope="row">{index + 1}</th>
                            <td style={{minWidth: '300px'}}>{`${item.lastname} ${item.firstname}`}</td>
                            <td>{item.email}</td>
                            <td className={"d-flex justify-content-center"}>
                                <button className={'btn btn-info text-white'} data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        style={{minWidth: '100px'}}
                                        onClick={() => setOwner(item)}>
                                    Chi tiết
                                </button>
                                <button className={'btn btn-primary ms-3'}
                                        style={{minWidth: '100px'}}
                                        onClick={() => handleAgree(item)}>
                                    Xác nhận
                                </button>
                                <button className={'btn btn-danger ms-3'}
                                        onClick={() => handleRefuse(item)}
                                        style={{minWidth: '100px'}}>
                                    Từ chối
                                </button>
                            </td>
                        </tr>
                    })
                    :
                    <tr align="center">
                        <td colSpan="8" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                    </tr>
                }
                </tbody>
            </table>
            <div className="modal fade modal-xl" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Thông tin chi tiết</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body row">

                            <div className={'col-12'}>
                                <div className="mb-3 row">
                                    <div className={'col-4'}>
                                        <div className={'text-center'}>
                                            <label htmlFor="recipient-name" className="col-form-label">Ảnh </label>
                                        </div>
                                        <div className={'d-flex justify-content-center'}>
                                            <img src={owner.avatar} className="form-control"
                                                 id="recipient-name" alt={'avatar'}
                                                 style={{width: '200px', height: '200px'}}/>
                                        </div>
                                    </div>
                                    <div className={'col-4'}>
                                        <div className={'text-center'}>
                                            <label htmlFor="recipient-name" className="col-form-label">Mặt trước
                                                CCCD</label>
                                        </div>
                                        <div className={'d-flex justify-content-center'}>
                                            <img src={owner.frontside} className="form-control" id="recipient-name"
                                                 alt={'avatar'} style={{width: '350px', height: '200px'}}/>
                                        </div>

                                    </div>
                                    <div className={'col-4'}>
                                        <div className={'text-center'}>
                                            <label htmlFor="recipient-name" className="col-form-label">Mặt sau
                                                CCCD</label>
                                        </div>
                                        <div className={'d-flex justify-content-center'}>
                                            <img src={owner.backside} className="form-control" id="recipient-name"
                                                 alt={'avatar'} style={{width: '350px', height: '200px'}}/>
                                        </div>


                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className={'col-6'}>
                                        <label htmlFor="recipient-name" className="col-form-label">Họ và tên </label>
                                        <input type="text" className="form-control" id="recipient-name"
                                               value={`${owner.firstname} ${owner.lastname}`} readOnly={true}/>
                                    </div>
                                    <div className={'col-6'}>
                                        <label htmlFor="recipient-name" className="col-form-label">Địa chỉ </label>
                                        <input type="text" className="form-control" id="recipient-name"
                                               value={`${owner.address} ${owner.ward} ${owner.district} ${owner.province}`}
                                               readOnly={true}/></div>
                                </div>

                                <div className="mb-3 row">
                                    <div className={'col-6'}>
                                        <label htmlFor="recipient-name" className="col-form-label">Email</label>
                                        <input type="text" className="form-control" id="recipient-name"
                                               value={owner.email} readOnly={true}/>
                                    </div>
                                    <div className={'col-6'}>
                                        <label htmlFor="recipient-name" className="col-form-label">Số điện thoại</label>
                                        <input type="text" className="form-control" id="recipient-name"
                                               value={owner.phone} readOnly={true}/>
                                    </div>
                                </div>

                                <div className="mb-3 row">

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmOwner;