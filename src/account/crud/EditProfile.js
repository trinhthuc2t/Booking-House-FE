import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import _ from 'lodash';
import {storage} from "../../firebase/firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid" ;
import accountService from "../AccountService";
import {toast} from 'react-toastify';
import {getAllDistrictsByProvinceId, getAllProvinces, getAllWardsByDistrictId} from "../../service/addressService";


const EditProfile = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [account, setAccount] = useState({});
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceName, setProvinceName] = useState("");
    const [districtName, setDistrictName] = useState("");


    useEffect(() => {
        getAllProvinces().then(response => {
            setProvinces(response.data.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])
    useEffect(() => {
        if (provinceName) {
            const province = provinces.find(item => item.ProvinceName === provinceName);
            if (province) {
                getAllDistrictsByProvinceId(province.ProvinceID).then(response => {
                    setDistricts(response.data.data);
                }).catch(error => {
                    console.log(error)
                })
            }
        } else {
            setDistricts([]);
            setDistrictName("");
        }
    }, [provinceName])

    useEffect(() => {
        if (districtName) {
            const district = districts.find(item => item.DistrictName === districtName);
            if (district) {
                getAllWardsByDistrictId(district.DistrictID).then(response => {
                    setWards(response.data.data);
                }).catch(error => {
                    console.log(error)
                })
            }
        } else {
            setWards([]);
        }
    }, [districtName])


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
            .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,"Nhập email có dạng @gmail")
            .min(11, "Email phải dài hơn 10 ký tự!")
            .required("Email không được để trống"),
        phone: Yup.string()
            .length(10, "Số điện phải gồm 10 số!")
            .typeError("Số điện thoại phải nhập số")
            .required("Số điện thoại không được để trống"),
        province: Yup.string()
            .required('Vui lòng không được để trống'),
        district: Yup.string()
            .required('Vui lòng không được để trống'),
        ward: Yup.string()
            .required('Vui lòng không được để trống')
    });
    const handleProfile = (values) => {
        let address = `${values.address}-${values.ward}-${values.district}-${values.province} `;
        console.log(address);
        let data = {...values, avatar: account.avatar, address: address};
        accountService.editAccount(id, data).then((response) => {
            toast.success("Sửa thông tin thành công", {position: "top-center", autoClose: 1000,});
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
        toast.info("Đang tải ảnh lên", {position: "top-center", autoClose: 500,});
        uploadBytes(imageRef, event.target.files[0]).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setAccount({...account, avatar: url});
                toast.success("Tải ảnh thành công", {position: "top-center", autoClose: 2000,});
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
                        address: account.address.split("-")[0],
                        email: account.email,
                        phone: account.phone,
                        avatar: account.avatar,
                        province: account.address.split("-")[3],
                        district: account.address.split("-")[2],
                        ward: account.address.split("-")[1]
                    }}
                            innerRef={(actions) => {
                                if (actions && actions.touched.province)
                                    setProvinceName(actions.values.province);

                                if (actions && actions.touched.district)
                                    setDistrictName(actions.values.district);

                            }}
                            validationSchema={validateSchema}

                            onSubmit={(values) => {
                                handleProfile(values);
                            }}>

                        {() => (
                            <Form className="row">
                                <div className="col-2 border-right ">
                                    <aside className="left-sidebar " style={{height: '80vh'}}>
                                        <div>
                                            <nav className="sidebar-nav row" data-simplebar="">
                                                <ul id="sidebarnav">
                                                    <li className="sidebar-item">
                                                        <Link to={`/profile/${id}`} className="sidebar-link">
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
                                                        <Link to={`/`} className="sidebar-link"
                                                              aria-expanded="false">
                                                            <span>
                                                              <i className="fa-solid fa-chevron-up"></i>
                                                            </span>
                                                            <span className="hide-menu">Đăng ký trở thành chủ nhà</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </aside>
                                </div>
                                <div className="col-md-3  border-right">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <img className="rounded-circle mt-5" width="250px" height="300px"
                                             src={account.avatar} alt="avatar" id="image" name="avatar"
                                             onChange={handleValueInput}/>
                                        <input type="file" onChange={selectImage}/>
                                    </div>
                                </div>

                                <div className="col-md-7 border-right">
                                    <div className="p-3 py-3">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="text-right">Sửa thông tin cá nhân</h4>
                                        </div>

                                    </div>
                                    <div className={"row"}>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label" htmlFor="firstname">Họ</label>
                                            <Field type="text" className="form-control" id="firstname"
                                                   placeholder="Nhập họ" value={account.firstname} name="firstname"
                                                   onInput={handleValueInput}/>
                                            <span style={{color: 'red'}}>
                                                <ErrorMessage name={'firstname'}></ErrorMessage>
                                            </span>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label" htmlFor="lastname">Tên</label>
                                            <Field type="text" className="form-control" id="Nhập tên"
                                                   placeholder="Enter Lastname" value={account.lastname}
                                                   name="lastname"
                                                   onInput={handleValueInput}/>
                                            <span style={{color: 'red'}}>
                                                <ErrorMessage name={'lastname'}></ErrorMessage>
                                            </span>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <label className="form-label" htmlFor="email">Email</label>
                                            <Field type="text" className="form-control" id="email"
                                                   placeholder="Nhập Email" value={account.email} name="email"
                                                   onInput={handleValueInput}/>
                                            <span style={{color: 'red'}}>
                                               <ErrorMessage name={'email'}></ErrorMessage>
                                            </span>
                                        </div>

                                        <div className=" mt-3">
                                            <div className="col-md-12 mb-3">
                                                <div className="col-md-12 mb-3">
                                                    <div className="row">

                                                        <div className="col-4">
                                                            <p className="form-label" htmlFor="province">Tỉnh/thành
                                                                phố</p>
                                                            <Field as="select" className="form-select" name="province"
                                                                   id="province">
                                                                <option
                                                                    value="">{account.address.split("-")[3]}</option>
                                                                {!_.isEmpty(provinces) && provinces.map(province => (
                                                                    <option key={province.ProvinceID}
                                                                            value={province.ProvinceName}>
                                                                        {province.ProvinceName}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <span style={{color: 'red'}}>
                                                               <ErrorMessage name={'province'}></ErrorMessage>
                                                            </span>
                                                        </div>
                                                        <div className="col-4">
                                                            <p className="form-label" htmlFor="district">Quận/Huyện</p>
                                                            <Field as="select" className="form-select" id="district"
                                                                   name="district">
                                                                <option
                                                                    value="">{account.address.split("-")[2]}</option>
                                                                {!_.isEmpty(districts) && districts.map(district => (
                                                                    <option key={district.DistrictID}
                                                                            value={district.DistrictName}>
                                                                        {district.DistrictName}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <span style={{color: 'red'}}>
                                                              <ErrorMessage name={'district'}></ErrorMessage>
                                                            </span>
                                                        </div>
                                                        <div className="col-4">
                                                            <p className="form-label" htmlFor="ward">Phường/xã</p>
                                                            <Field as="select" className="form-select" id="ward"
                                                                   name="ward">
                                                                <option
                                                                    value="">{account.address.split("-")[1]}</option>
                                                                {!_.isEmpty(wards) && wards.map(ward => (
                                                                    <option key={ward.WardCode} value={ward.WardName}>
                                                                        {ward.WardName}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <span style={{color: 'red'}}>
                                                                <ErrorMessage name={'ward'}></ErrorMessage>
                                                          </span>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label className="form-label" htmlFor="address">Số
                                                        nhà</label>
                                                    <Field type="text" className="form-control" id="address"
                                                           placeholder="Nhập địa chỉ"
                                                           value={account.address.split("-")[0]}
                                                           name="address"
                                                           onInput={handleValueInput}/>
                                                    <span style={{color: 'red'}}>
                                                        <ErrorMessage name={'address'}></ErrorMessage>
                                                    </span>
                                                </div>

                                                <div className="col-md-12 mb-3">
                                                    <label className="form-label" htmlFor="phone">Số điện thoại</label>
                                                    <Field type="text" className="form-control" id="phone"
                                                           placeholder="Nhập số điện thoại" value={account.phone}
                                                           name="phone"
                                                           onInput={handleValueInput}/>
                                                    <span style={{color: 'red'}}>
                                                       <ErrorMessage name={'phone'}></ErrorMessage>
                                                   </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-center d-flex justify-content-around">
                                                <Link to={'/'}>
                                                    <button className="btn btn-primary profile-button" type="button">Trở
                                                        về
                                                    </button>
                                                </Link>
                                                <button className="btn btn-primary profile-button" type="submit">Lưu
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                }
            </div>
        </div>
    );
};

export default EditProfile;