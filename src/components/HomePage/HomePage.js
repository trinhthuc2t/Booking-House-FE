import React, {useEffect, useState} from 'react';
import Banner from "./Banner";
import _ from "lodash";
import AdminTeam from "./AdminTeam";
import HouseComponent from "./HouseComponent";
import {getAllProvinces} from "../../service/addressService";

const HomePage = () => {
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        getAllProvinces().then(response => {
            setProvinces(response.data.data);
        }).catch(error => {
            console.log(error)
        })
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    return (
        <div className="container-home">
            <Banner/>

            {/*Search begin*/}
            <div className="container-fluid mb-5" style={{padding: "35px", backgroundColor: "rgb(0,185,142)"}}>
                <div className="container">
                    <div className="row g-2">
                        <div className="col-md-10">
                            <div className="row g-2">
                                <div className="col-md-4">
                                    <input type="text" className="form-control border-0 py-3"
                                           placeholder="Nhập từ khóa tìm kiếm"/>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select border-0 py-3">
                                        <option>Khoảng giá</option>
                                        <option value="1">Dưới 1.000.000 ₫</option>
                                        <option value="2">Từ 1.000.000 ₫ - 5.000.000 ₫</option>
                                        <option value="3">Trên 5.000.000 ₫</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select border-0 py-3">
                                        <option>Vị trí</option>
                                        {!_.isEmpty(provinces) && provinces.map(province => (
                                            <option key={province.ProvinceID}
                                                    value={province.ProvinceName}>
                                                {province.ProvinceName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-dark border-0 w-100 py-3">Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*Search End*/}

            <div className="container py-5">
                <HouseComponent/>
                <AdminTeam/>

            </div>
        </div>
    );
};

export default HomePage;