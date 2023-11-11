import './login.scss'
import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import LoginRegisterService from "../../../service/login-registerService";
import {useEffect, useState} from "react";
import {loginSchema} from "../../../validate/validate";
import {useDispatch} from "react-redux";
import {saveAccount} from "../../../redux/actions";

function Login({setShow}) {
    const dispatch = useDispatch();
    useEffect(() => {
        setShow(false);
    }, [])
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [checkPassword, setCheckPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const login = (value) => {
        LoginRegisterService.login(value)
            .then(res => {
                if (res.data.status === "Đang hoạt động") {
                    if (remember) {
                        localStorage.setItem("account", JSON.stringify(res.data));
                    }
                    dispatch(saveAccount(res.data));
                    setShow(true);
                    navigate("/");
                }else {
                    setShow(true);
                    navigate("/contact-admin");
                }
            })
            .catch(err => {
                setCheckPassword("Sai mật khẩu");
            })
    }

    return (
        <section className="vh-100 bg-image"
                 style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
            <div className="d-flex align-items-center h-100 gradient-custom-3">
                <div className="container login-container">
                    <div className="row">
                        <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
                            <div className="panel border bg-white py-3 px-2">
                                <div className="panel-heading">
                                    <h2 className="pt-3 text-uppercase">Đăng nhập</h2>
                                </div>
                                <div className="panel-body p-3">
                                    <Formik
                                        initialValues={{
                                            username: '',
                                            password: '',
                                        }}
                                        validationSchema={loginSchema}
                                        onSubmit={values => {
                                            login(values)
                                        }}>
                                        {({values}) => (
                                            <Form>
                                                <div className="form-group py-2">
                                                    <label className="form-label">Tên đăng nhập</label>
                                                    <div className="input-field py-2">
                                                        <span className="far fa-user p-2"></span>
                                                        <Field type="text" id="username" name="username"
                                                               placeholder="Tên đăng nhập"/>
                                                    </div>
                                                    <ErrorMessage name="username" className="text-danger"
                                                                  component="div"/>
                                                </div>
                                                <div className="form-group py-1 mt-2">
                                                    <label className="form-label">Mật khẩu</label>
                                                    <div className="input-field">
                                                        <span className="fas fa-lock px-2"></span>
                                                        <Field type={showPassword ? "text" : "password"} id="password"
                                                               name="password"
                                                               placeholder="Mật khẩu"/>
                                                        <button type="button" className="btn bg-white text-muted"
                                                                onClick={toggleShowPassword}>
                                                            <span className="far fa-eye-slash"></span>
                                                        </button>
                                                    </div>
                                                    <ErrorMessage name="password" className="text-danger"
                                                                  component="div"/>
                                                    <div className="text-danger">{checkPassword}</div>
                                                </div>
                                                <div className="form-inline my-3 text-center">
                                                    <input type="checkbox" name="remember" id="remember"
                                                           checked={remember}
                                                           onChange={() => setRemember(!remember)}/>
                                                    <label htmlFor="remember" className="text-muted">
                                                        Ghi nhớ đăng nhập
                                                    </label>
                                                    <Link to={"/forgot-password"} className="forgot ms-4">Quên mật khẩu?</Link>
                                                </div>

                                                <div className="text-center mt-4">
                                                    <button type="submit"
                                                            className="btn btn-success border-0 btn-login btn-lg">
                                                        Đăng nhập
                                                    </button>
                                                </div>
                                                <div className="text-center pt-4 text-muted">
                                                    Bạn chưa có tài khoản?
                                                    <Link className="ms-2" to={"/register"}
                                                          style={{color: '#00B98EFF'}}>
                                                        <b>Đăng ký</b>
                                                    </Link>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                                <div className="mx-3 my-2 py-2 bordert">
                                    <div className="text-center mt-3">
                                        <a href="https://wwww.facebook.com" className="px-2">
                                            <img
                                                src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg"
                                                alt=""/>
                                        </a>
                                        <a href="https://www.google.com" className="px-2">
                                            <img
                                                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                                                alt=""/>
                                        </a>

                                        <a href="https://www.github.com" className="px-2">
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
            </div>
        </section>
    )
}

export default Login;