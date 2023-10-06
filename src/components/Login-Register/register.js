import './register.css'
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import LoginRegisterService from "../../service/login-registerService";
import {useEffect} from "react";
import {registerSchema} from "../../validate/validate";
import Swal from "sweetalert2";

function Register({setShow}) {
    let navigate = useNavigate();

    useEffect(() => {
        setShow(false);
    }, [])

    const initialValues = {
        username: "",
        email: "",
        password: ""
    };

    const handleSubmit = (value) => {
        LoginRegisterService.register(value)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký tài khoản thành công !',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/login");
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng ký tài khoản thất bại !',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    return (
        <section className="vh-100 bg-image"
                 style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
            <div className="d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{borderRadius: "15px"}}>
                                <div className="card-body" style={{padding: '10px 40px'}}>
                                    <h2 className="text-uppercase text-center mb-4 mt-2">Đăng ký</h2>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={registerSchema}
                                        onSubmit={values => {
                                            handleSubmit(values)}
                                        }>
                                        <Form>

                                            <div className="form-outline mb-2">
                                                <label className="form-label" htmlFor="username">Tên đăng nhập:</label>
                                                <Field type="text" id="username" name="username" placeholder="Tên đăng nhập"
                                                       className="form-control form-control py-2"/>
                                                <ErrorMessage name="username" className="text-danger mt-1" component="div"/>
                                            </div>

                                            <div className="form-outline mb-2">
                                                <label className="form-label" htmlFor="email">Email:</label>
                                                <Field type="email" id="email" name="email" placeholder="Email"
                                                       className="form-control form-control py-2"/>
                                                <ErrorMessage name="email" className="text-danger mt-1" component="div"/>
                                            </div>

                                            <div className="form-outline mb-2">
                                                <label className="form-label" htmlFor="form3Example4cg">Mật khẩu:</label>
                                                <Field type="password" id="password" name="password" placeholder="Mật khẩu"
                                                       className="form-control form-control py-2"/>
                                                <ErrorMessage name="password" className="text-danger mt-1" component="div"/>
                                            </div>

                                            <div className="form-outline mb-2">
                                                <label className="form-label" htmlFor="confirmPassword">
                                                    Xác nhận lại mật khẩu:
                                                </label>
                                                <Field type="password" id="confirmPassword" name="confirmPassword" placeholder="Xác nhận mật khẩu"
                                                       className="form-control form-control py-2"/>
                                                <ErrorMessage name="confirmPassword" className="text-danger mt-1" component="div"/>
                                            </div>

                                            <div className="d-flex justify-content-center mt-3">
                                                <button type="submit" className="btn btn-success btn-lg">
                                                    Đăng ký
                                                </button>
                                            </div>

                                            <div className="text-center text-muted mt-3 mb-2">
                                                Bạn đã có tài khoản?
                                                <Link to={"/login"} className="fw-bold ms-2" style={{color: '#00B98EFF'}}>
                                                    <u>Đăng nhập</u>
                                                </Link>
                                            </div>
                                        </Form>
                                    </Formik>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;