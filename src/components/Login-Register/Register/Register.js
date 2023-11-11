import './register.scss';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import LoginRegisterService from "../../../service/login-registerService";
import {useEffect} from "react";
import {registerSchema} from "../../../validate/validate";
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
                                            handleSubmit(values)
                                        }
                                        }>
                                        {({errors}) => (
                                            <Form>
                                                <div className="form-outline mb-2">
                                                    <label className="form-label" htmlFor="username">Tên đăng nhập <span
                                                        className="text-danger">*</span></label>
                                                    <Field type="text" id="username" name="username"
                                                           placeholder="Ví dụ: user"
                                                           className="form-control form-control py-2"/>
                                                    <ErrorMessage name="username" className="text-danger mt-1"
                                                                  component="div"/>
                                                    {!errors.username &&
                                                        <small className="mt-1 text-secondary">
                                                            Tên đăng nhập không được chứa kí tự đặc biệt
                                                        </small>
                                                    }
                                                </div>

                                                <div className="form-outline mb-2">
                                                    <label className="form-label" htmlFor="email">Email <span
                                                        className="text-danger">*</span></label>
                                                    <Field type="email" id="email" name="email"
                                                           placeholder="Ví dụ: user@gmail.com"
                                                           className="form-control form-control py-2"/>
                                                    <ErrorMessage name="email" className="text-danger mt-1"
                                                                  component="div"/>
                                                    {!errors.email &&
                                                        <small className="mt-1 text-secondary">
                                                            Email phải đúng định dạng email
                                                        </small>
                                                    }
                                                </div>

                                                <div className="form-outline mb-2">
                                                    <label className="form-label" htmlFor="password">
                                                        Mật khẩu <span className="text-danger">*</span>
                                                    </label>
                                                    <Field type="password" id="password" name="password"
                                                           placeholder="Ví dụ: User12"
                                                           className="form-control form-control py-2"/>
                                                    <ErrorMessage name="password" className="text-danger mt-1"
                                                                  component="div"/>
                                                    {!errors.password &&
                                                        <small className="mt-1 text-secondary">
                                                            Mật khẩu ít nhất 6 kí tự, chứa chữ cái viết hoa, viết thường
                                                            và ký tự số
                                                        </small>
                                                    }
                                                </div>

                                                <div className="form-outline mb-2">
                                                    <label className="form-label" htmlFor="confirmPassword">
                                                        Xác nhận lại mật khẩu <span className="text-danger">*</span>
                                                    </label>
                                                    <Field type="password" id="confirmPassword" name="confirmPassword"
                                                           placeholder="Xác nhận lại mật khẩu"
                                                           className="form-control form-control py-2"/>
                                                    <ErrorMessage name="confirmPassword" className="text-danger mt-1"
                                                                  component="div"/>
                                                </div>

                                                <div className="d-flex justify-content-center mt-3">
                                                    <button type="submit" className="btn btn-success btn-lg">
                                                        Đăng ký
                                                    </button>
                                                </div>

                                                <div className="text-center text-muted mt-3 mb-2">
                                                    Bạn đã có tài khoản?
                                                    <Link to={"/login"} className="fw-bold ms-2"
                                                          style={{color: '#00B98EFF'}}>
                                                        <u>Đăng nhập</u>
                                                    </Link>
                                                </div>
                                            </Form>
                                        )}
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