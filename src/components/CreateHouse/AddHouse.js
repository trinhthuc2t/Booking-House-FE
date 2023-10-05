import React, {useEffect, useState, useRef} from 'react';
import {Field, Form, Formik} from "formik";
import {getAllDistrictsByProvinceId, getAllProvinces, getAllWardsByDistrictId} from "../../service/addressService";
import _ from 'lodash';
import {addHouseSchema} from "../../validate/validate";
import {Modal} from "react-bootstrap";
import TinyMCE from "./TinyMCE";
import './addHouse.scss';
import ImageItem from "./ImageItem";
import ThumnailItem from "./ThumnailItem";
import {createHouse} from "../../service/ownerService";
import Swal from 'sweetalert2'

const AddHouse = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceName, setProvinceName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [isDescription, setIsDescription] = useState(true);
    const [showTinyMCE, setShowTinyMCE] = useState(false);
    const [thumnailURL, setThumnailURL] = useState("");
    const [imagesURL, setImagesURL] = useState([]);
    const [thumnailFile, setThumnailFile] = useState(null);
    const [imagesFile, setImagesFile] = useState([]);

    const thumnailRef = useRef();
    const imagesRef = useRef();

    const handleClose = () => setShowTinyMCE(false);
    const handleShowDescription = () => {
        setShowTinyMCE(true);
        setIsDescription(true);
    }

    const handleShowFacility = () => {
        setShowTinyMCE(true);
        setIsDescription(false);
    }

    const editorRef = useRef(null);
    const handleSaveTinyMCE = (values) => {
        if (editorRef.current) {
            if (isDescription)
                values.description = editorRef.current.getContent();
            else
                values.facility = editorRef.current.getContent();
            handleClose();
        }
    };

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

    const handleThumnailFile = (event, values) => {
        values.thumbnail = 'ok';
        setThumnailFile(event.target.files[0]);
        if (thumnailRef) thumnailRef.current.value = null;
    }

    const handleImagesFile = (event, values) => {
        values.images = 'ok';
        setImagesFile([...imagesFile, ...event.target.files]);
        if (imagesRef) imagesRef.current.value = null;
    }

    const handleCreateHouse = (data) => {
        data.address = `${data.houseNumber}, ${data.ward}, ${data.district}, ${data.province}`;
        data.thumbnail = thumnailURL;
        data.images = imagesURL;
        data.owner = {id: 1};
        console.log(data)
        createHouse(data).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Thêm nhà thành công !',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Thêm nhà thất bại !',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    return (
        <div className="container">
            <Formik
                initialValues={{
                    name: "",
                    bedroom: "",
                    bathroom: "",
                    province: "",
                    district: "",
                    ward: "",
                    houseNumber: "",
                    newPrice: "",
                    oldPrice: "",
                    description: "",
                    facility: "",
                    thumbnail: "",
                    images: ""
                }}
                innerRef={(actions) => {
                    if (actions && actions.touched.province)
                        setProvinceName(actions.values.province);

                    if (actions && actions.touched.district)
                        setDistrictName(actions.values.district);
                }}
                validationSchema={addHouseSchema}
                validateOnBlur={true}
                validateOnChange={true}
                onSubmit={values => {
                    handleCreateHouse(values);
                }}>
                {({errors, touched, values}) => (
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
                                <label htmlFor="bedroom" className="form-label">Số phòng ngủ:</label>
                                <Field as="select" className="form-select" name="bedroom">
                                    <option value="">---Vui lòng chọn---</option>
                                    {Array.from({length: 10}, (v, i) => (
                                        <option value={i + 1} key={i + 1}>{i + 1}</option>
                                    ))}
                                </Field>
                                {errors.bedroom && touched.bedroom ?
                                    <small className="text-danger">{errors.bedroom}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="mb-3 col-4">
                                <label htmlFor="bathroom" className="form-label">Số phòng tắm:</label>
                                <Field as="select" className="form-select" name="bathroom">
                                    <option value="">---Vui lòng chọn---</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Field>
                                {errors.bathroom && touched.bathroom ?
                                    <small className="text-danger">{errors.bathroom}</small>
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
                                <label className="form-label" htmlFor="houseNumber">Địa chỉ thêm:</label>
                                <Field className="form-control" id="houseNumber" type="text" name="houseNumber"
                                       placeholder="Số nhà"/>
                                {errors.houseNumber && touched.houseNumber ?
                                    <small className="text-danger">{errors.houseNumber}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="col-md-4 form-group mb-3">
                                <label className="form-label" htmlFor="newPrice">Giá tiền mới (VNĐ/ngày):</label>
                                <Field className="form-control" id="newPrice" type="number" name="newPrice"
                                       placeholder="Giá tiền mới"/>
                                {errors.newPrice && touched.newPrice ?
                                    <small className="text-danger">{errors.newPrice}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="col-md-4 form-group mb-3">
                                <label className="form-label" htmlFor="oldPrice">Giá tiền cũ (VNĐ/ngày):</label>
                                <Field className="form-control" id="oldPrice" type="number" name="oldPrice"
                                       placeholder="Giá tiền cũ"/>
                                {errors.oldPrice && touched.oldPrice ?
                                    <small className="text-danger">{errors.oldPrice}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label htmlFor="description" className="form-label">Mô tả:</label>
                                <Field as="textarea" type="text" className="form-control" id="description"
                                       name="description" placeholder="Mô tả" onClick={handleShowDescription}/>
                                {errors.description && touched.description ?
                                    <small className="text-danger">{errors.description}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label htmlFor="facility" className="form-label">Tiện ích:</label>
                                <Field as="textarea" type="text" className="form-control" id="facility"
                                       name="facility" placeholder="Tiện ích" onClick={handleShowFacility}/>
                                {errors.facility && touched.facility ?
                                    <small className="text-danger">{errors.facility}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label htmlFor="thumbnail" className="form-label">Ảnh đại diện:</label>
                                <input type="file" className="form-control" id="thumbnail" name="thumbnail"
                                       ref={thumnailRef}
                                       onChange={(event) => handleThumnailFile(event, values)}/>
                                {errors.thumbnail && touched.thumbnail ?
                                    <small className="text-danger">{errors.thumbnail}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label htmlFor="images" className="form-label">Ảnh thêm:</label>
                                <input type="file" className="form-control" id="images" name="images" multiple={true}
                                       onChange={(event) => handleImagesFile(event, values)} ref={imagesRef}/>
                                {errors.images && touched.images ?
                                    <small className="text-danger">{errors.images}</small>
                                    :
                                    null
                                }
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <ThumnailItem file={thumnailFile} setThumnailFile={setThumnailFile}
                                              setThumnailURL={setThumnailURL} values={values}/>
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                {imagesFile && imagesFile.map(file => (
                                    <ImageItem file={file} setImagesFile={setImagesFile}
                                               setImagesURL={setImagesURL} key={file.name}
                                               imagesFile={imagesFile} values={values}/>
                                ))}

                            </div>

                            <div className="text-center my-3">
                                <button type="submit" className="btn btn-primary">Thêm nhà</button>
                            </div>
                        </div>

                        <Modal
                            show={showTinyMCE}
                            onHide={handleClose}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <TinyMCE editorRef={editorRef} handleSaveTinyMCE={handleSaveTinyMCE}
                                     values={values} isDescription={isDescription}/>
                        </Modal>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddHouse;