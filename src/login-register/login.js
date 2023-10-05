import './login.css'
import * as Yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import LoginRegisterService from "../service/login-registerService";
import {useState} from "react";

function Login() {
    const back = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const initialValues = {
        username: '',
        password: '',
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const validationSchema = Yup.object({
        username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
        password: Yup.string().required('Vui lòng nhập mật khẩu')
    });
    const login = (value) => {
        LoginRegisterService.login(value)
            .then(res => {
                console.log(res.data)
                back("/")
            })
            .catch(err => {
                console.log(err)
                alert("Tài khoản không tồn tại")
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
                    <div className="panel border bg-white">
                        <div className="panel-heading">
                            <h3 className="pt-3 font-weight-bold">Login</h3>
                        </div>
                        <div className="panel-body p-3">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={values => {
                                    login(values)
                                }
                                }>
                                <Form>
                                    <div className="form-group py-2">
                                        <div className="input-field">
                                            <span className="far fa-user p-2"></span>
                                            <Field type="text" id="username" name="username"
                                                   placeholder="Username or Email" required/>
                                            <ErrorMessage name="username" className="text-danger" component="div"/>
                                        </div>
                                    </div>
                                    <div className="form-group py-1 pb-2">
                                        <div className="input-field">
                                            <span className="fas fa-lock px-2"></span>
                                            <Field type={showPassword ? "text" : "password"} id="password"
                                                   name="password"
                                                   placeholder="Enter your Password" required/>
                                            <ErrorMessage name="password" className="text-danger" component="div"/>
                                            <button className="btn bg-white text-muted" onClick={toggleShowPassword}>
                                                <span className="far fa-eye-slash"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-inline">
                                        <input type="checkbox" name="remember" id="remember"/>
                                        <label htmlFor="remember" className="text-muted">Remember me</label>
                                        <a href="#" id="forgot" className="font-weight-bold"> Forgot password?</a>
                                    </div>
                                    <button type="submit"
                                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login
                                    </button>
                                    <div className="text-center pt-4 text-muted">Don't have an account? <Link
                                        to={"/register"} style={{color: '#84fab0'}}>Sign
                                        up</Link>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                        <div className="mx-3 my-2 py-2 bordert">
                            <div className="text-center py-3">
                                <a href="https://wwww.facebook.com" target="_blank" className="px-2">
                                    <img src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg"
                                         alt=""/>
                                </a>
                                <a href="https://www.google.com" target="_blank" className="px-2">
                                    <img
                                        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                                        alt=""/>
                                </a>

                                <a href="https://www.github.com" target="_blank" className="px-2">
                                    <img
                                        src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png"
                                        alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;