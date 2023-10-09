import React from 'react';
import {useSelector} from "react-redux";

const BodyProfile = () => {

    const account = useSelector(state => state.account);
    return (

        <>
            <div className="col-md-3 mt-5 border-right row">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img className="rounded-circle mt-5" width="300px" height="300px"
                         src={account.avatar} alt="avatar" id="image" name="avatar"/>
                </div>
            </div>
            <div className="col-md-7 mt-5 border-right">
                <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Thông tin cá nhân</h4>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label className="labels" htmlFor="firstname">Họ</label>
                            <input type="text" className="form-control" id="firstname"
                                   placeholder="Nhập họ" value={account.firstname} name="firstname"
                                   readOnly={true}/>
                        </div>
                        <div className="col-md-6">
                            <label className="labels" htmlFor="lastname">Tên</label>
                            <input type="text" className="form-control" id="Nhập tên"
                                   placeholder="Enter Lastname" value={account.lastname} name="lastname"
                                   readOnly={true}/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 mb-3">
                            <label className="labels" htmlFor="address">Địa chỉ</label>
                            <input type="text" className="form-control" id="address"
                                   placeholder="Nhập địa chỉ" value={account.address} name="address"
                                   readOnly={true}/>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="labels" htmlFor="email">Email</label>
                            <input type="text" className="form-control" id="email"
                                   placeholder="Nhập Email" value={account.email} name="email"
                                   readOnly={true}/>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="labels" htmlFor="phone">Số điện thoại</label>
                            <input type="text" className="form-control" id="phone"
                                   placeholder="Nhập số điện thoại" value={account.phone} name="phone"
                                   readOnly={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default BodyProfile;