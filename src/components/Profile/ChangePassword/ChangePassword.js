import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";

import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import AccountService from "../../../service/AccountService";
import {useSelector} from "react-redux";
import {changePasswordSchema} from "../../../validate/validate";

const ChangePassword = () => {

    const navigate = useNavigate();


    const account = useSelector(state => state.account);
    const [accountInfor, setAccountInfor] = useState({});

    useEffect(() => {
        getAccountById();
    }, []);
    const getAccountById = () => {
        AccountService.getAccountById(account.id).then((response) => {
            setAccountInfor(response);
        }).catch(function (err) {
            console.log(err);
        })
    }
    const handleChangePassword = (values) => {
        console.log(accountInfor);
        AccountService.checkPassword(accountInfor).then((response) => {
            if (!response) {
                toast.error("Mật khẩu cũ không đúng!!!", {position: "top-center", autoClose: 1000,});
            } else {
                if (values.newPassword !== values.confirmNewPassword) {
                    toast.error("Mật khẩu mới không đúng!!!", {position: "top-center", autoClose: 1000,});
                } else {
                    const newAccount = {...accountInfor, password: values.newPassword};
                    editPassword(newAccount);
                }
            }
        }).catch(function (err) {
            console.log(err);

        })
    }
    const editPassword = (account) => {
        AccountService.changePassWord(account).then((response) => {
            toast.success("Thay đổi mật khẩu thành công", {position: "top-center", autoClose: 1000,});
            navigate("/profile/information ");
        });
    }
    return (
        <div className="col-9">
            <h3 className="text-center text-uppercase">Thay đổi mật khẩu</h3>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card border-0 shadow-2-strong" style={{borderRadius: "1rem"}}>
                        <div className="card-body">
                            <Formik
                                initialValues={{
                                    password: '',
                                    newPassword: '',
                                    confirmNewPassword: ''
                                }}
                                validationSchema={changePasswordSchema}
                                onSubmit={(values) => {
                                    handleChangePassword(values);
                                }}>
                                {({errors}) => (
                                    <Form>
                                        <div className="form-outline mb-4">
                                            <div>
                                                <label className="form-label" htmlFor="password">Mật khẩu cũ <span
                                                    className='text-danger'>*</span></label>
                                            </div>
                                            <Field type="text" id="password" name="password"
                                                   className="form-control form-control py-2"
                                                   placeholder="Nhập mật khẩu hiện tại"
                                                   onInput={(event) => {
                                                       setAccountInfor({...accountInfor, password: event.target.value})
                                                   }}/>
                                            <ErrorMessage name='password' className="text-danger" component="small"/>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <div>
                                                <label className="form-label" htmlFor="newPassword">
                                                    Mật khẩu mới <span className='text-danger'>*</span>
                                                </label>
                                            </div>
                                            <Field type="password" id="newPassword" name="newPassword"
                                                   placeholder="Ví dụ: User12"
                                                   className="form-control form-control py-2"/>
                                            <ErrorMessage name='newPassword' className="text-danger" component="small"/>
                                            {!errors.newPassword &&
                                                <small className="text-secondary">
                                                    Mật khẩu ít nhất 6 kí tự, chứa chữ cái viết hoa, viết thường
                                                    và ký tự số
                                                </small>
                                            }
                                        </div>
                                        <div className="form-outline mb-4">
                                            <div>
                                                <label className="form-label" htmlFor="confirmNewPassword">
                                                    Xác nhận mật khẩu mới <span className='text-danger'>*</span>
                                                </label>
                                            </div>
                                            <Field type="password" id="confirmNewPassword"
                                                   name="confirmNewPassword"
                                                   placeholder="Xác nhận lại mật khẩu mới"
                                                   className="form-control form-control py-2"/>
                                            <ErrorMessage name='confirmNewPassword' className="text-danger"
                                                          component="small"/>
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-lg btn-block btn-primary border-0"
                                                    style={{backgroundColor: "#39dd86 ", color: "#fff"}}
                                                    type="submit">
                                                Cập nhật
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChangePassword;