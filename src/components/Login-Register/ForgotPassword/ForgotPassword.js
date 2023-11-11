import {ErrorMessage, Field, Form, Formik} from "formik";
import LoginRegisterService from "../../../service/login-registerService";
import Swal from "sweetalert2";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {forgotPasswordSchema} from "../../../validate/validate";
import {CircularProgress} from "@mui/material";

function ForgotPassword({setShow}) {
    const [checkEmail, setCheckEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShow(false);
    }, [])

    const sendPassword = (value) => {
        setIsLoading(true);
        LoginRegisterService.sendPassword(value)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Mật khẩu mới đã được gửi về email của bạn!',
                    text: 'Vui lòng kiểm tra email'
                })
                setIsLoading(false);
                navigate("/login");
            })
            .catch(err => {
                console.log(err);
                setCheckEmail("Email không tồn tại");
                setIsLoading(false);
            })
    }
    return (
        <section className="vh-100 bg-image"
                 style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
            <div className="d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card py-4" style={{borderRadius: "15px"}}>
                                <div className="card-body" style={{padding: '10px 40px'}}>
                                    <h2 className="text-uppercase text-center mb-5 mt-2">Quên mật khẩu</h2>
                                    <Formik
                                        initialValues={{
                                            email: ""
                                        }}
                                        onSubmit={sendPassword}
                                        validationSchema={forgotPasswordSchema}>
                                        <Form>
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="email">
                                                    Email đăng ký tài khoản <span className="text-danger">*</span>
                                                </label>
                                                <Field type="text" id="email" name="email"
                                                       placeholder="Nhập email"
                                                       className="form-control form-control py-2"
                                                       onInput={() => setCheckEmail("")}/>
                                                <ErrorMessage name="email" className="text-danger mt-1"
                                                              component="div"/>
                                                <div className="text-danger mt-1">{checkEmail}</div>
                                            </div>
                                            <div className="d-flex justify-content-center mt-5">
                                                <button type="submit" className="btn btn-success btn-lg">
                                                    Xác nhận
                                                </button>
                                                <Link to="/login" type="button"
                                                      className="btn btn-secondary btn-lg ms-3"
                                                      style={{minWidth: '110px'}}>
                                                    Hủy
                                                </Link>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading &&
                    <div className="w-100 h-100 position-absolute top-0 start-0 d-flex justify-content-center align-items-center"
                         style={{background: 'rgba(0,0,0,0.4)'}}>
                        <CircularProgress color="success" />
                    </div>
                }
            </div>
        </section>
    )
}

export default ForgotPassword