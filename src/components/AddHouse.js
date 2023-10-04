import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import {getAllDistrictsByProvinceId, getAllProvinces, getAllWardsByDistrictId} from "../service/addressService";
import _ from 'lodash';
import {addHouseSchema} from "../validate/validate";

const AddHouse = () => {
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
    return (
        <div className="container">
            <Formik
                initialValues={{
                    name: "",
                    bedRoom: "",
                    livingRoom: "",
                    province: "",
                    district: "",
                    ward: ""
                }}
                innerRef={(actions) => {
                    if (actions && actions.touched.province)
                        setProvinceName(actions.values.province);

                    if (actions && actions.touched.district)
                        setDistrictName(actions.values.district);
                }}
                validationSchema={addHouseSchema}
                onSubmit={values => {
                    console.log(values)
                }}>
                {({errors, touched}) => (
                    <Form>
                        <div className="row">
                            <div className="mb-3 col-4">
                                <label htmlFor="name" className="form-label">Tên nhà:</label>
                                <Field type="text" className="form-control" id="name" placeholder="Tên nhà"
                                       name="name"/>
                                {errors.name && touched.name ?
                                    <small className="text-danger">{errors.name}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="mb-3 col-4">
                                <label htmlFor="bedRoom" className="form-label">Số phòng ngủ:</label>
                                <Field as="select" className="form-select" name="bedRoom">
                                    <option value="">---Vui lòng chọn---</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="3">4</option>
                                    <option value="3">5</option>
                                </Field>
                                {errors.bedRoom && touched.bedRoom ?
                                    <small className="text-danger">{errors.bedRoom}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="mb-3 col-4">
                                <label htmlFor="bedRoom" className="form-label">Số phòng khách:</label>
                                <Field as="select" className="form-select" name="livingRoom">
                                    <option value="">---Vui lòng chọn---</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="3">4</option>
                                    <option value="3">5</option>
                                </Field>
                                {errors.livingRoom && touched.livingRoom ?
                                    <small className="text-danger">{errors.livingRoom}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="col-4 form-group mb-3">
                                <label className="form-label" htmlFor="province">Tỉnh/Thành
                                    phố:</label>
                                <Field as="select" className="form-select" id="province" name="province">
                                    <option value="">---Chọn Tỉnh/Thành phố---</option>
                                    {!_.isEmpty(provinces) && provinces.map(province => (
                                        <option key={province.ProvinceID}
                                                value={province.ProvinceName}>
                                            {province.ProvinceName}
                                        </option>
                                    ))}
                                </Field>
                                {errors.province && touched.province ?
                                    <small className="text-danger">{errors.province}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="col-4 form-group mb-3">
                                <label className="form-label" htmlFor="district">Quận/Huyện:</label>
                                <Field as="select" className="form-select" id="district" name="district">
                                    <option value="">---Chọn Quận/Huyện---</option>
                                    {!_.isEmpty(districts) && districts.map(district => (
                                        <option key={district.DistrictID}
                                                value={district.DistrictName}>
                                            {district.DistrictName}
                                        </option>
                                    ))}
                                </Field>
                                {errors.district && touched.district ?
                                    <small className="text-danger">{errors.district}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="col-4 form-group mb-3">
                                <label className="form-label" htmlFor="ward">Phường/Xã:</label>
                                <Field as="select" className="form-select" id="ward" name="ward">
                                    <option value="">---Chọn Phường/Xã---</option>
                                    {!_.isEmpty(wards) && wards.map(ward => (
                                        <option key={ward.WardCode} value={ward.WardName}>
                                            {ward.WardName}
                                        </option>
                                    ))}
                                </Field>
                                {errors.ward && touched.ward ?
                                    <small className="text-danger">{errors.ward}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="col-md-4 form-group mb-3">
                                <label className="form-label" htmlFor="address">Địa chỉ:</label>
                                <Field className="form-control" id="address" type="text" name="address"
                                       placeholder="Số nhà"/>
                            </div>

                            <div className="col-md-4 form-group mb-3">
                                <label htmlFor="description" className="form-label">Mô tả</label>
                                <Field type="text" className="form-control" id="description" name="description" placeholder="Mô tả"/>
                            </div>

                            <div className="col-md-4 form-group mb-3">
                                <label htmlFor="facility" className="form-label">Tiện ích</label>
                                <Field type="text" className="form-control" id="facility" name="facility" placeholder="Tiện ích"/>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Thêm nhà</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddHouse;