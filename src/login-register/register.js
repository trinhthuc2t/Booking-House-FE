import './register.css'
import * as Yup from 'yup';
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import LoginRegisterService from "../service/login-registerService";

function Register() {
    let back = useNavigate();
    const initialValues = {
        username: "",
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Vui lòng nhập tên đăng nhập')
            .matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, 'Tên đăng nhập không hợp lệ')
            .test('unique', 'Tên đăng nhập đã tồn tại', async (value) => {
                let rps = await LoginRegisterService.getAccountByUsername(value)
                 if (rps.data === ""){
                     return true
                 }
                 return false

            }),
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: Yup.string()
            .required('Mật khẩu không được bỏ trống')
            .min(8, 'Mật khẩu phải chứa ít nhất 8 kí tự')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/,
                'Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 ký tự số và 1 ký tự đặc biệt'
            ),
        confirmPassword: Yup.string().required('Vui lòng xác nhận lại mật khẩu')
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
    });

    const handleSubmit = (value) => {
        LoginRegisterService.register(value)
            .then(res => {
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
                back("/login")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <section className="vh-100 bg-image"
                 style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{borderRadius: "15px"}}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={values => {
                                            handleSubmit(values)}
                                        }>
                                        <Form>

                                            <div className="form-outline mb-4">
                                                <Field type="text" id="username" name="username"
                                                       className="form-control form-control-lg"/>
                                                <label className="form-label" htmlFor="form3Example1cg">Your
                                                    Username</label>
                                                <ErrorMessage name="username" className="text-danger" component="div"/>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <Field type="email" id="email" name="email"
                                                       className="form-control form-control-lg"/>
                                                <label className="form-label" htmlFor="form3Example3cg">Your
                                                    Email</label>
                                                <ErrorMessage name="email" className="text-danger" component="div"/>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <Field type="password" id="password" name="password"
                                                       className="form-control form-control-lg"/>
                                                <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                                <ErrorMessage name="password" className="text-danger" component="div"/>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <Field type="password" id="confirmPassword" name="confirmPassword"
                                                       className="form-control form-control-lg"/>
                                                <label className="form-label" htmlFor="form3Example4cdg">Repeat your
                                                    password</label>
                                                <ErrorMessage name="confirmPassword" className="text-danger" component="div"/>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                       id="form2Example3cg"/>
                                                <label className="form-check-label" htmlFor="form2Example3g">
                                                    I agree all statements in <a href="#!" className="text-body"><u>Terms
                                                    of
                                                    service</u></a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="submit"
                                                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register
                                                </button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link
                                                to={"/login"}
                                                className="fw-bold text-body"><u>Login here</u></Link></p>

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