import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import _ from 'lodash';
import {storage} from "../../firebase/firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid" ;
import {toast} from 'react-toastify';
import {getAllDistrictsByProvinceId, getAllProvinces, getAllWardsByDistrictId} from "../../service/addressService";
import "./up.scss";
import {MdCloudUpload} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {profileSchema} from "../../validate/validate";
import {editAccount} from "../../redux/actions";
import AccountService from "../../service/AccountService";

const EditProfile = ({status}) => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [accountInfo, setAccountInfo] = useState({});
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceName, setProvinceName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [identifyFront, setIdentifyFront] = useState(null);
    const [identifyBack, setIdentifyBack] = useState(null);
    const [fileFront, setFileFront] = useState("No selected file");
    const account = useSelector(state => state.account);
    const dispatch = useDispatch();

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


    const handleProfile = (values) => {
        let address = `${values.address}-${values.ward}-${values.district}-${values.province} `;
        let data = {...values, avatar: accountInfo.avatar, address: address};
        AccountService.editAccount(account.id, data).then((response) => {
            toast.success("Sửa thông tin thành công", {position: "top-center", autoClose: 1000,});
            console.log(response);
            console.log("Account", account)
            account.firstname = response.firstname;
            account.lastname = response.lastname;
            account.address = response.address;
            account.email = response.email;
            account.phone = response.phone;
            account.avatar = response.avatar;
            dispatch(editAccount(account));
            localStorage.setItem("account", JSON.stringify(account));
        }).catch(function (err) {
            console.log(err);
        })
    }
    const handleRegisterOwner = (values) => {
        let address = `${values.address}-${values.ward}-${values.district}-${values.province} `;
        let data = {
            ...values,
            avatar: accountInfo.avatar,
            address: address,
            frontside: identifyFront,
            backside: identifyBack
        };
        console.log(data);
        AccountService.registerOwner(id, data).then((response) => {
            toast.success("Sửa thông tin thành công", {position: "top-center", autoClose: 1000,});
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        })

    }
    useEffect(() => {
        getAccountById();
    }, []);
    const getAccountById = () => {

        AccountService.getAccountById(account.id).then((response) => {
            setAccountInfo(response)
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
                setAccountInfo({...accountInfo, avatar: url});
                toast.success("Tải ảnh thành công", {position: "top-center", autoClose: 2000,});
                var output = document.getElementById('image');
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src) // free memory
                }
            });
        })
    }

    const uploadIdentify = (event) => {
        if (event.target.files[0] == null) return;
        const imageRef = ref(storage, `images/${event.target.files[0].name + v4()}`);
        const {name} = event.target;
        console.log(name);
        toast.info("Đang tải ảnh lên", {position: "top-center", autoClose: 500,});
        uploadBytes(imageRef, event.target.files[0]).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
                toast.success("Tải ảnh thành công", {position: "top-center", autoClose: 2000,});
                if (name === "frontside") {
                    setIdentifyFront(url);
                } else if (name === "backside") {
                    setIdentifyBack(url)
                }
            });
        })
    }
    const handleValueInput = (e) => {
        let {name, value} = e.target;
        setAccountInfo({...accountInfo, [name]: value});

    }

    const handleProps = () => {
        if (status) {
            return <div className="mt-2 text-center d-flex justify-content-center">
                <Link to={'/'} className="btn btn-lg btn-danger me-4" type="button"
                      style={{minWidth: '100px'}}>
                    Hủy
                </Link>
                <button className="btn btn-lg btn-primary" type="submit"
                        style={{minWidth: '100px'}}>
                    Lưu
                </button>
            </div>
        } else {
            return (
                <div className="mt-3">
                    <div className="text-center d-flex">
                        <div className={"col-6"}>
                            <p>Mặt trước CCCD</p>
                            <form className='identify'
                                  onClick={() => document.querySelector("#frontsideFile").click()}>
                                <input type="file" id="frontsideFile" name="frontside" onChange={(event) => {
                                    event.target.files[0] && setFileFront(event.target.files[0].name);
                                    uploadIdentify(event)
                                }} hidden/>
                                {identifyFront ?
                                    <img src={identifyFront} id="frontside" width={'100%'} height={'100%'} alt={'img'}/>
                                    :
                                    <MdCloudUpload color={"#1475cf"} size={60}></MdCloudUpload>
                                }
                            </form>
                        </div>
                        <div className="col-6">
                            <p>Mặt sau CCCD</p>
                            <form className='identify'
                                  onClick={() => document.querySelector("#backsideFile").click()}>
                                <input type="file" id="backsideFile" name="backside" onChange={(event) => {
                                    event.target.files[0] && setFileFront(event.target.files[0].name);
                                    uploadIdentify(event)

                                }} hidden/>
                                {identifyBack ?
                                    <img src={identifyBack} id="backside" width={'100%'} height={'100%'} alt={'img'}/>
                                    :
                                    <MdCloudUpload color={"#1475cf"} size={60}></MdCloudUpload>
                                }
                            </form>
                        </div>
                    </div>

                    <div className="mt-5 text-center d-flex justify-content-around">
                        <button className="btn btn-lg btn-primary profile-button"
                                type="submit">Đăng ký
                        </button>
                    </div>
                </div>
            )
        }


    }
    return (
        <div className="col-9">
            {!_.isEmpty(accountInfo) &&
                <Formik initialValues={{
                    firstname: accountInfo.firstname,
                    lastname: accountInfo.lastname,
                    address: accountInfo.address.split("-")[0],
                    email: accountInfo.email,
                    phone: accountInfo.phone,
                    avatar: accountInfo.avatar,
                    province: accountInfo.address.split("-")[3],
                    district: accountInfo.address.split("-")[2],
                    ward: accountInfo.address.split("-")[1],
                    frontside: '',
                    backside: ''
                }}
                        innerRef={(actions) => {
                            if (actions && actions.touched.province)
                                setProvinceName(actions.values.province);

                            if (actions && actions.touched.district)
                                setDistrictName(actions.values.district);

                        }}
                        validationSchema={profileSchema}
                        onSubmit={(values) => {
                            if (status) {
                                handleProfile(values);
                            } else {
                                handleRegisterOwner(values);
                            }
                        }}>
                    {() => (
                        <Form className="row">
                            <div className="col-md-4">
                                {/* Select Image*/}
                                <div className="d-flex flex-column align-items-center text-center px-3 mt-5">
                                    <img className="rounded-circle" width="300px" height="300px"
                                         src={accountInfo.avatar} alt="avatar" id="image" name="avatar"
                                         onChange={handleValueInput}/>
                                    <input className="mt-2 form-control" type="file" onChange={selectImage}/>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h3 className="text-center mb-4 text-uppercase">Sửa thông tin cá nhân</h3>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label" htmlFor="lastname">Họ</label>
                                        <Field type="text" className="form-control" id="lastname"
                                               placeholder="Nhập họ" value={accountInfo.lastname} name="lastname"
                                               onInput={handleValueInput}/>
                                        <ErrorMessage name={'lastname'} className="text-danger" component="small"/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label" htmlFor="firstname">Tên</label>
                                        <Field type="text" className="form-control" id="firstname"
                                               placeholder="Nhập tên" value={accountInfo.firstname}
                                               name="firstname"
                                               onInput={handleValueInput}/>
                                        <ErrorMessage name='firstname' className="text-danger" component="small"/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <Field type="text" className="form-control" id="email"
                                               placeholder="Nhập Email" value={accountInfo.email} name="email"
                                               onInput={handleValueInput}/>
                                        <ErrorMessage name='email' className="text-danger" component="small"/>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label" htmlFor="phone">Số điện thoại</label>
                                        <Field type="text" className="form-control" id="phone"
                                               placeholder="Nhập số điện thoại" value={accountInfo.phone}
                                               name="phone"
                                               onInput={handleValueInput}/>
                                        <ErrorMessage name='phone' className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="col-6 mb-3">
                                        <label className="form-label" htmlFor="province">
                                            Tỉnh/thành phố
                                        </label>
                                        <Field as="select" className="form-select" name="province"
                                               id="province">
                                            <option
                                                value="">{accountInfo.address.split("-")[3]}</option>
                                            {!_.isEmpty(provinces) && provinces.map(province => (
                                                <option key={province.ProvinceID}
                                                        value={province.ProvinceName}>
                                                    {province.ProvinceName}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name='province' className="text-danger"
                                                      component="small"/>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label" htmlFor="district">Quận/Huyện</label>
                                        <Field as="select" className="form-select" id="district"
                                               name="district">
                                            <option
                                                value="">{accountInfo.address.split("-")[2]}</option>
                                            {!_.isEmpty(districts) && districts.map(district => (
                                                <option key={district.DistrictID}
                                                        value={district.DistrictName}>
                                                    {district.DistrictName}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name='district' className="text-danger"
                                                      component="small"/>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label" htmlFor="ward">Phường/xã</label>
                                        <Field as="select" className="form-select" id="ward"
                                               name="ward">
                                            <option
                                                value="">{accountInfo.address.split("-")[1]}</option>
                                            {!_.isEmpty(wards) && wards.map(ward => (
                                                <option key={ward.WardCode} value={ward.WardName}>
                                                    {ward.WardName}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name='ward' className="text-danger"
                                                      component="small"/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label" htmlFor="address">
                                            Số nhà
                                        </label>
                                        <Field type="text" className="form-control" id="address"
                                               placeholder="Nhập địa chỉ"
                                               value={accountInfo.address.split("-")[0]}
                                               name="address"
                                               onInput={handleValueInput}/>
                                        <ErrorMessage name='address' className="text-danger"
                                                      component="small"/>
                                    </div>
                                    {handleProps()}
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            }
        </div>
    );
};

export default EditProfile;