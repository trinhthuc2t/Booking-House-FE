import React from 'react';
import {useSelector} from "react-redux";
import image_default from '../../../image/user-image.png';

const Information = () => {
    
    const account = useSelector(state => state.account);
    return (
        <div className="col-9">
            <div className="row">
                <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center text-center px-3 mt-5">
                        <img className="rounded-circle" width="300px" height="300px"
                             src={account.avatar ? account.avatar : image_default} alt="" id="image" name="avatar"/>
                    </div>
                </div>
                <div className="col-md-8">
                    <h3 className="text-center mb-4 text-uppercase">Thông tin cá nhân</h3>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="lastname">Họ và tên đệm</label>
                            <input type="text" className="form-control" id="lastname"
                                   placeholder="Nhập họ" value={account.lastname} name="lastname"
                                   readOnly={true}/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="firstname">Tên</label>
                            <input type="text" className="form-control" id="firstname"
                                   placeholder="Nhập tên" value={account.firstname} name="firstname"
                                   readOnly={true}/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 mb-3">
                            <label className="form-label" htmlFor="address">Địa chỉ</label>
                            <input type="text" className="form-control" id="address"
                                   placeholder="Nhập địa chỉ" value={`${account.address} - ${account.ward} - ${account.district} - ${account.province}`} name="address"
                                   readOnly={true}/>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input type="text" className="form-control" id="email"
                                   placeholder="Nhập Email" value={account.email} name="email"
                                   readOnly={true}/>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label" htmlFor="phone">Số điện thoại</label>
                            <input type="text" className="form-control" id="phone"
                                   placeholder="Nhập số điện thoại" value={account.phone} name="phone"
                                   readOnly={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Information;