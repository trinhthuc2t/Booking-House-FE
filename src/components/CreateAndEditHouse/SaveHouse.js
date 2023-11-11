import React, {useEffect, useState, useRef} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getAllDistrictsByProvinceId, getAllProvinces, getAllWardsByDistrictId} from "../../service/addressService";
import _ from 'lodash';
import {saveHouseSchema} from "../../validate/validate";
import {Modal} from "react-bootstrap";
import './saveHouse.scss';
import {createHouse, editHouse} from "../../service/ownerService";
import Swal from 'sweetalert2'
import ThumbnailItem from "./ThumbnailItem/ThumbnailItem";
import ImageItem from "./ImageItem/ImageItem";
import TinyMCE from "./TinyMCE/TinyMCE";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getHouseByIdAndOwnerId} from "../../service/houseService";
import {getAllImagesByHouseId} from "../../service/imageService";
import ImageItemEdit from "./ImageItemEdit/ImageItemEdit";
import {useSelector} from "react-redux";

const SaveHouse = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceName, setProvinceName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [isDescription, setIsDescription] = useState(true);
    const [showTinyMCE, setShowTinyMCE] = useState(false);
    const [thumbnailURL, setThumbnailURL] = useState("");
    const [imagesURL, setImagesURL] = useState([]);
    const [imagesURLEdit, setImagesURLEdit] = useState([]);
    const [imagesURLDelete, setImagesURLDelete] = useState([]);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [imagesFile, setImagesFile] = useState([]);
    const [house, setHouse] = useState({});
    const [description, setDescription] = useState("");
    const [facility, setFacility] = useState("");
    const account = useSelector(state => state.account);
    const navigate = useNavigate();


    const {houseId} = useParams();

    const thumbnailRef = useRef();
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
        if (!editorRef.current) return;
        if (editorRef.current.getContent()) {
            console.log(editorRef.current.getContent())
            if (isDescription) {
                values.description = "Bài viết mô tả đã được lưu. Click để sửa bài viết";
                setDescription(editorRef.current.getContent());
            } else {
                values.facility = "Bài viết giới thiệu tiện ích đã được lưu. Click để sửa bài viết";
                setFacility(editorRef.current.getContent());
            }
        } else {
            if (isDescription) {
                values.description = "";
                setDescription("");
            } else {
                values.facility = "";
                setFacility("");
            }
        }
        handleClose();
    };

    useEffect(() => {
        const callAPI = async () => {
            const provincesData = await getAllProvinces();
            await setProvinces(provincesData.data.data);

            if (houseId) {
                const imagesHouseData = await getAllImagesByHouseId(houseId);
                setImagesURLEdit(imagesHouseData.data);

                const houseData = await getHouseByIdAndOwnerId(houseId, account.id);
                setThumbnailURL(houseData.data.thumbnail);
                setHouse(houseData.data);
                setDescription(houseData.data.description);
                setFacility(houseData.data.facility);
                setProvinceName(houseData.data.province);
                setDistrictName(houseData.data.district);
            } else {
                setHouse({
                    name: "",
                    bedroom: "",
                    bathroom: "",
                    province: "",
                    district: "",
                    ward: "",
                    houseNumber: "",
                    price: "",
                    sale: 0,
                    area: "",
                    description: "",
                    facility: "",
                    thumbnail: "",
                    images: ""
                })
            }
        }

        callAPI().then();
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
    }, [provinceName, provinces])

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
    }, [districtName, districts])

    const handleThumbnailFile = (event, values) => {
        values.thumbnail = 'is valid';
        setThumbnailFile(event.target.files[0]);
        if (thumbnailRef) thumbnailRef.current.value = null;
    }

    const handleImagesFile = (event, values) => {
        values.images = 'is valid';
        setImagesFile([...imagesFile, ...event.target.files]);
        if (imagesRef) imagesRef.current.value = null;
    }

    const handleSaveHouse = (values) => {
        const data = {...values};
        data.id = parseInt(houseId);
        data.address = `${data.houseNumber}, ${data.ward}, ${data.district}, ${data.province}`;
        data.description = description;
        data.facility = facility;
        data.thumbnail = thumbnailURL;
        data.owner = {id: account.id};
        if (houseId) {
            data.createAt = house.createAt;
            data.status = house.status;
            data.images = [...imagesURLEdit, ...imagesURL];
            data.imagesDelete = imagesURLDelete;
            editHouse(data).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật nhà thành công !',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/profile/houses-owner");
            }).catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Thêm nhà thất bại !',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        } else {
            data.images = imagesURL;
            createHouse(data).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm nhà thành công !',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/profile/houses-owner");
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
    }

    return (
        <div className="container">
            {!_.isEmpty(house) &&
                <Formik
                    initialValues={{
                        name: house.name,
                        bedroom: house.bedroom,
                        bathroom: house.bathroom,
                        province: house.province,
                        district: house.district,
                        ward: house.ward,
                        houseNumber: house.houseNumber,
                        price: house.price,
                        sale: house.sale,
                        area: house.area,
                        description: house.description ? "Bài viết mô tả đã được lưu. Click để sửa bài viết" : "",
                        facility: house.facility ? "Bài viết giới thiệu tiện ích đã được lưu. Click để sửa bài viết" : "",
                        thumbnail: thumbnailURL ? "is valid" : "",
                        images: !_.isEmpty(imagesURLEdit) ? "is valid" : ""
                    }}
                    innerRef={(actions) => {
                        if (actions && actions.touched.province)
                            setProvinceName(actions.values.province);

                        if (actions && actions.touched.district)
                            setDistrictName(actions.values.district);
                    }}
                    validationSchema={saveHouseSchema}
                    validateOnBlur={true}
                    validateOnChange={true}
                    onSubmit={values => {
                        handleSaveHouse(values);
                    }}>
                    {({values}) => (
                        <Form>
                            <div className="row">
                                <h2 className="text-center text-uppercase mb-5">{houseId ? "Sửa đổi thông tin nhà" : "Thêm nhà mới"}</h2>
                                <div className="mb-3 col-4">
                                    <label htmlFor="name" className="form-label">Tên nhà</label>
                                    <Field type="text" className="form-control" id="name" placeholder="Nhập tên nhà"
                                           name="name"/>
                                    <ErrorMessage name="name" className="text-danger" component="small"/>
                                </div>

                                <div className="mb-3 col-4">
                                    <label htmlFor="bedroom" className="form-label">Số phòng ngủ</label>
                                    <Field as="select" className="form-select" name="bedroom">
                                        <option value="">---Vui lòng chọn---</option>
                                        {Array.from({length: 10}, (v, i) => (
                                            <option value={i + 1} key={i + 1}>{i + 1}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="bedroom" className="text-danger" component="small"/>
                                </div>

                                <div className="mb-3 col-4">
                                    <label htmlFor="bathroom" className="form-label">Số phòng tắm</label>
                                    <Field as="select" className="form-select" name="bathroom">
                                        <option value="">---Vui lòng chọn---</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Field>
                                    <ErrorMessage name="bathroom" className="text-danger" component="small"/>
                                </div>

                                <div className="col-4 form-group mb-3">
                                    <label className="form-label" htmlFor="province">
                                        Tỉnh/Thành phố
                                    </label>
                                    <Field as="select" className="form-select" id="province" name="province">
                                        <option value="">---Chọn Tỉnh/Thành phố---</option>
                                        {!_.isEmpty(provinces) && provinces.map(province => (
                                            <option key={province.ProvinceID}
                                                    value={province.ProvinceName}>
                                                {province.ProvinceName}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="province" className="text-danger" component="small"/>
                                </div>

                                <div className="col-4 form-group mb-3">
                                    <label className="form-label" htmlFor="district">Quận/Huyện</label>
                                    <Field as="select" className="form-select" id="district" name="district">
                                        <option value="">---Chọn Quận/Huyện---</option>
                                        {!_.isEmpty(districts) && districts.map(district => (
                                            <option key={district.DistrictID}
                                                    value={district.DistrictName}>
                                                {district.DistrictName}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="district" className="text-danger" component="small"/>
                                </div>

                                <div className="col-4 form-group mb-3">
                                    <label className="form-label" htmlFor="ward">Phường/Xã</label>
                                    <Field as="select" className="form-select" id="ward" name="ward">
                                        <option value="">---Chọn Phường/Xã---</option>
                                        {!_.isEmpty(wards) && wards.map(ward => (
                                            <option key={ward.WardCode} value={ward.WardName}>
                                                {ward.WardName}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="ward" className="text-danger" component="small"/>
                                </div>

                                <div className="col-md-3 form-group mb-3">
                                    <label className="form-label" htmlFor="houseNumber">Địa chỉ chi tiết</label>
                                    <Field className="form-control" id="houseNumber" type="text" name="houseNumber"
                                           placeholder="Nhập địa chỉ chi tiết"/>
                                    <ErrorMessage name="houseNumber" className="text-danger" component="small"/>
                                </div>

                                <div className="col-md-3 form-group mb-3">
                                    <label className="form-label" htmlFor="price">Giá tiền (VNĐ/ngày)</label>
                                    <Field className="form-control" id="price" type="number" name="price"
                                           placeholder="Nhập giá tiền"/>
                                    <ErrorMessage name="price" className="text-danger" component="small"/>
                                </div>

                                <div className="col-md-3 form-group mb-3">
                                    <label className="form-label" htmlFor="sale">Giảm giá (%)</label>
                                    <Field className="form-control" id="sale" type="number" name="sale"
                                           placeholder="Nhập % giảm giá"/>
                                    <ErrorMessage name="sale" className="text-danger" component="small"/>
                                </div>

                                <div className="col-md-3 form-group mb-3">
                                    <label className="form-label" htmlFor="area">Diện tích (m2)</label>
                                    <Field className="form-control" id="area" type="number" name="area"
                                           placeholder="Nhập diện tích"/>
                                    <ErrorMessage name="area" className="text-danger" component="small"/>
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="description" className="form-label">Mô tả</label>
                                    <Field as="textarea" type="text" className="form-control" id="description" readOnly
                                           name="description" placeholder="Click để viết bài mô tả"
                                           onClick={handleShowDescription}/>
                                    <ErrorMessage name="description" className="text-danger" component="small"/>
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="facility" className="form-label">Tiện ích</label>
                                    <Field as="textarea" type="text" className="form-control" id="facility" readOnly
                                           name="facility" placeholder="Click để viết bài giới thiệu các tiện ích"
                                           onClick={handleShowFacility}/>
                                    <ErrorMessage name="facility" className="text-danger" component="small"/>
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="thumbnail" className="form-label">Ảnh đại diện</label>
                                    <input type="file" className="form-control" id="thumbnail" name="thumbnail"
                                           ref={thumbnailRef}
                                           onChange={(event) => handleThumbnailFile(event, values)} accept={"image/jpeg ,image/png"}/>
                                    <ErrorMessage name="thumbnail" className="text-danger" component="small"/>
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="images" className="form-label">Ảnh giới thiệu chi tiết</label>
                                    <input type="file" className="form-control" id="images" name="images"
                                           multiple={true}
                                           onChange={(event) => handleImagesFile(event, values)} ref={imagesRef} accept={"image/jpeg ,image/png"}/>
                                    <ErrorMessage name="images" className="text-danger" component="small" />
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <ThumbnailItem file={thumbnailFile} setThumbnailFile={setThumbnailFile}
                                                   setThumbnailURL={setThumbnailURL} thumbnailURL={thumbnailURL}
                                                   values={values}/>
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    {!_.isEmpty(imagesURLEdit) && imagesURLEdit.map((item, index) => (
                                        <ImageItemEdit key={item.id} index={index} url={item.url}
                                                       setImageURLEdit={setImagesURLEdit} values={values}
                                                       imagesFile={imagesFile} setImagesURLDelete={setImagesURLDelete}/>
                                    ))}

                                    {!_.isEmpty(imagesFile) && imagesFile.map(file => (
                                        <ImageItem file={file} setImagesFile={setImagesFile}
                                                   setImagesURL={setImagesURL} key={file.name}
                                                   imagesFile={imagesFile} values={values} houseId={houseId}/>
                                    ))}

                                </div>

                                <div className="text-center my-3">
                                    <button type="submit" className="btn btn-lg btn-primary me-3"
                                            style={{minWidth: '120px'}}>
                                        {houseId ? "Cập nhật" : "Thêm nhà"}
                                    </button>
                                    <Link to="/profile/houses-owner" className="btn btn-lg btn-secondary"
                                    style={{minWidth: '120px'}}>
                                        Hủy
                                    </Link>
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
                                         description={description} isDescription={isDescription}
                                         facility={facility} values={values} handleClose={handleClose}/>
                            </Modal>
                        </Form>
                    )}
                </Formik>
            }
        </div>
    );
};

export default SaveHouse;