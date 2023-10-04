import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import _ from 'lodash';
import {storage} from "../../../firebase/firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid" ;
import accountService from "../AccountService";
import {toast} from 'react-toastify';


const EditProfile = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [account, setAccount] = useState({});

    const validateSchema = Yup.object().shape({
        firstname: Yup.string()
            .min(2, "Họ có ít nhất 2 ký tự!")
            .required("Họ không được để trống"),
        lastname: Yup.string()
            .min(2, "Tên có ít nhất 2 ký tự!")
            .required("Tên không được để trống"),
        address: Yup.string()
            .min(2, "Mô tả dài hơn 2 ký tự!")
            .required("Địa chỉ không được để trống"),
        email: Yup.string()
            .email("Nhập email có dạng @gmail.com")
            .min(11, "Email phải dài hơn 10 ký tự!")
            .required("Email không được để trống"),
        phone: Yup.string()
            .length(10, "Số điện phải gồm 10 số!")
            .typeError("Số điện thoại phải nhập số")
            .required("Số điện thoại không được để trống")
    });
    const handleProfile = (values) => {
        let data = {...values, avatar: account.avatar};
        accountService.editAccount(id, data).then((response) => {
            toast.success("Edit profile success", {position: "top-center", autoClose: 1000,});
        }).catch(function (err) {
            console.log(err);
        })
    }
    useEffect(() => {
        getAccountById();
    }, []);
    const getAccountById = () => {

        accountService.getAccountById(id).then((response) => {
            setAccount(response)
        }).catch(function (err) {
            console.log(err);
        })
    }
    const selectImage = (event) => {


        if (event.target.files[0] == null) return;
        const imageRef = ref(storage, `images/${event.target.files[0].name + v4()}`);
        toast.info("Uploading Image", {position: "top-center", autoClose: 500,});
        uploadBytes(imageRef, event.target.files[0]).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setAccount({...account, avatar: url});
                toast.success("Upload Image success", {position: "top-center", autoClose: 2000,});
                var output = document.getElementById('image');
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src) // free memory
                }
            });
        })
    }
    const handleValueInput = (e) => {
        let {name, value} = e.target;
        setAccount({...account, [name]: value});
    }
    return (
        <div className="container-fluid">
            <div className=" rounded bg-white mb-5">
                {!_.isEmpty(account) &&
                    <Formik initialValues={{
                        firstname: account.firstname,
                        lastname: account.lastname,
                        address: account.address,
                        email: account.email,
                        phone: account.phone,
                        avatar: account.avatar
                    }}
                            validationSchema={validateSchema}
                            onSubmit={(values) => {
                                handleProfile(values);
                            }}>
                        <Form className="row">
                            <div className="col-2 border-right">
                                <aside className="left-sidebar">

                                    <div>
                                        <div className="brand-logo d-flex align-items-center justify-content-between">
                                            <a className="text-nowrap logo-img">
                                                <img src="../assetsHieu/images/logos/dark-logo.svg" width="180" alt=""/>
                                            </a>
                                            <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
                                                 id="sidebarCollapse">
                                                <i className="ti ti-x fs-8"></i>
                                            </div>
                                        </div>

                                        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                                            <ul id="sidebarnav">
                                                <li className="nav-small-cap">
                                                    <Link to={"/"}>
                                                        <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                                        <span className="hide-menu">Home</span>
                                                    </Link>

                                                </li>
                                                <li className="sidebar-item">

                                                    <Link to={"/"} className="sidebar-link">
                                                         <span>
                                                             <i className="fa-solid fa-user"></i>
                                                            </span>
                                                        <span className="hide-menu">Thông tin cá nhân</span>
                                                    </Link>
                                                </li>

                                                <li className="sidebar-item">
                                                    <Link to={`/editProfile/${id}`} className="sidebar-link"
                                                       aria-expanded="false">
                                                        <span>
                                                          <i className="fa-solid fa-pen-to-square"></i>
                                                        </span>
                                                        <span className="hide-menu">Sửa thông tin cá nhân</span>
                                                    </Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to={`/changePassword/${id}`} className="sidebar-link"
                                                       aria-expanded="false">
                                                            <span>
                                                              <i className="fa-solid fa-rotate"></i>
                                                            </span>
                                                        <span className="hide-menu">Đổi mật khẩu</span>
                                                    </Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <a className="sidebar-link"
                                                       aria-expanded="false">
                                                        <span>
                                                          <i className="ti ti-cards"></i>
                                                        </span>
                                                        <span className="hide-menu">Card</span>
                                                    </a>
                                                </li>
                                                <li className="sidebar-item">
                                                    <a className="sidebar-link"
                                                       aria-expanded="false">
                                                        <span>
                                                          <i className="ti ti-file-description"></i>
                                                        </span>
                                                        <span className="hide-menu">Forms</span>
                                                    </a>
                                                </li>
                                                <li className="sidebar-item">
                                                    <a className="sidebar-link"
                                                       aria-expanded="false">
                                                        <span>
                                                          <i className="ti ti-typography"></i>
                                                        </span>
                                                        <span className="hide-menu">Typography</span>
                                                    </a>
                                                </li>
                                                <li className="nav-small-cap">
                                                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                                    <span className="hide-menu">AUTH</span>
                                                </li>
                                                <li className="sidebar-item">
                                                    <a className="sidebar-link"
                                                       aria-expanded="false">
                                                        <span>
                                                          <i className="ti ti-login"></i>
                                                        </span>
                                                        <span className="hide-menu">Login</span>
                                                    </a>
                                                </li>
                                                <li className="sidebar-item">
                                                    <a className="sidebar-link"
                                                       aria-expanded="false">
                                                    <span>
                                                      <i className="ti ti-user-plus"></i>
                                                    </span>
                                                        <span className="hide-menu">Register</span>
                                                    </a>
                                                </li>
                                                <li className="nav-small-cap">
                                                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                                    <span className="hide-menu">EXTRA</span>
                                                </li>
                                                <li className="sidebar-item">
                                                    <a className="sidebar-link"
                                                       aria-expanded="false">
                                                    <span>
                                                      <i className="ti ti-mood-happy"></i>
                                                    </span>
                                                        <span className="hide-menu">Icons</span>
                                                    </a>
                                                </li>
                                                <li className="sidebar-item">
                                                    <a className="sidebar-link"
                                                       aria-expanded="false">
                                                            <span>
                                                              <i className="ti ti-aperture"></i>
                                                            </span>
                                                        <span className="hide-menu">Sample Page</span>
                                                    </a>
                                                </li>
                                            </ul>

                                        </nav>

                                    </div>

                                </aside>
                            </div>
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img className="rounded-circle mt-5" width="250px" height="300px"
                                         src={account.avatar} alt="avatar" id="image" name="avatar"
                                         onChange={handleValueInput}/>
                                    <input type="file" onChange={selectImage}/>
                                    <span> </span>
                                </div>
                            </div>

                            <div className="col-md-7 border-right">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Thông tin cá nhân</h4>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels" htmlFor="firstname">Họ</label>
                                            <Field type="text" className="form-control" id="firstname"
                                                   placeholder="Nhập họ" value={account.firstname} name="firstname"
                                                   onInput={handleValueInput}/>
                                            <span style={{color: 'red'}}>
                                       <ErrorMessage name={'firstname'}></ErrorMessage>
                                   </span>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels" htmlFor="lastname">Tên</label>
                                            <Field type="text" className="form-control" id="Nhập tên"
                                                   placeholder="Enter Lastname" value={account.lastname} name="lastname"
                                                   onInput={handleValueInput}/>
                                            <span style={{color: 'red'}}>
                                       <ErrorMessage name={'lastname'}></ErrorMessage>
                                   </span>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12 mb-3">
                                            <label className="labels" htmlFor="address">Địa chỉ</label>
                                            <Field type="text" className="form-control" id="address"
                                                   placeholder="Nhập địa chỉ" value={account.address} name="address"
                                                   onInput={handleValueInput}/>
                                            <span style={{color: 'red'}}>
                                       <ErrorMessage name={'address'}></ErrorMessage>
                                   </span>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label className="labels" htmlFor="email">Email</label>
                                            <Field type="text" className="form-control" id="email"
                                                   placeholder="Nhập Email" value={account.email} name="email"
                                                   onInput={handleValueInput}/>
                                            <span style={{color: 'red'}}>
                                       <ErrorMessage name={'email'}></ErrorMessage>
                                   </span>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label className="labels" htmlFor="phone">Số điện thoại</label>
                                            <Field type="text" className="form-control" id="phone"
                                                   placeholder="Nhập số điện thoại" value={account.phone} name="phone"
                                                   onInput={handleValueInput}/>
                                            <span style={{color: 'red'}}>
                                       <ErrorMessage name={'phone'}></ErrorMessage>
                                   </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-center d-flex justify-content-around">
                                        <Link to={'/'}>
                                            <button className="btn btn-primary profile-button" type="button">Trở về
                                            </button>
                                        </Link>
                                        <button className="btn btn-primary profile-button" type="submit">Lưu</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                }
            </div>
        </div>
    );
};

export default EditProfile;