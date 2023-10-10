import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import AccountService from "../../service/AccountService";
import {toast} from "react-toastify";

const ConfirmOwner = () => {
    const [listRegister, setListRegister] = useState([]);
    const [owner, setOwner] = useState({});
    const [load, setLoad] = useState(false);

    useEffect(() => {
        getListRegister();
        setLoad(false);
    }, [load])
    const getListRegister = () => {
        AccountService.getListRegisterOwner().then((response) => {
            console.log(response.data);
            setListRegister(response.data);
        }).catch(function (err) {
            console.log(err);
        })
    }

    const handleAgree = (value) => {
        let data = {...value, status: "Đã xác nhận"};
        AccountService.registerOwner(data).then((response) => {
            console.log(response);
            toast.success(response, {position: "top-center", autoClose: 1000,});
            setLoad(true);
        }).catch(function (err) {
            console.log(err);
        })
    }

    const checkListRegister =() => {
        if (listRegister.length === 0) {
            return (
                <div className={''}>
                    <h6>Không có đơn đăng ký làm chủ nhà</h6>
                </div>
            )
        }else {
            return  <table className="table">
                <thead>
                <tr className={'text-center'}>
                    <th scope="col">#</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {listRegister.map((l, ind) => {
                    return <tr key={ind} className={'text-center'}>
                        <th scope="row">{l.id}</th>
                        <td>{`${l.firstname} ${l.lastname}`}</td>
                        <td className={"d-flex justify-content-evenly"}>
                            <button className={'btn btn-info'} data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    data-bs-whatever="@mdo"
                                    onClick={() => {
                                        setOwner(l);
                                    }}>Thông tin Chi tiết
                            </button>
                            <button className={'btn btn-primary'} onClick={() => {
                                handleAgree(l);
                            }}>Xác nhận
                            </button>
                            <button className={'btn btn-danger'}>Hủy</button>
                        </td>
                    </tr>
                })}

                </tbody>
            </table>
        }
    }

    return (

        <div className={'col-9'}>
            <div className={"text-center"}>
                <h3> Danh sách đăng ký làm chủ nhà</h3>
            </div>


            {checkListRegister()}
            <div className="modal fade  modal-xl" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
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
                                            <img src={owner.account?.avatar} className="form-control"
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
                                        <label htmlFor="recipient-name" className="col-form-label">Họ và tên </label>
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