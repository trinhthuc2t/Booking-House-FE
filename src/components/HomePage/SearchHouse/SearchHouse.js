import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {getAllProvinces} from "../../../service/addressService";

const SearchHouse = ({setNameSearch, setProvince, setMinPrice, setMaxPrice, setCurrentPage}) => {
    const [provinces, setProvinces] = useState([]);

    const handleNameSearchChange = (event) => {
        setCurrentPage(1);
        setNameSearch(event.target.value)
    };
    const handleOptionLocalChange = (event) => {
        setCurrentPage(1);
        const provinceOption = event.target.value;
        if (provinceOption !== "Vị trí") setProvince(event.target.value)
        else setProvince("");
    };
    const handleOptionChange = (event) => {
        setCurrentPage(1)
        const price = event.target.value;
        if (price === "1") {
            setMinPrice(0);
            setMaxPrice(1999999)
        }
        if (price === "2") {
            setMinPrice(2000000);
            setMaxPrice(2999999)
        }
        if (price === "3") {
            setMinPrice(3000000);
            setMaxPrice(0)
        }
        if (price === "Khoảng giá") {
            setMinPrice(0);
            setMaxPrice(0);
        }
    };

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
        <div className="container-fluid mb-5" style={{padding: "35px", backgroundColor: "rgb(0,185,142)"}}>
            <div className="container">
                <div className="row g-2">
                    <div className="col-md-10">
                        <div className="row g-2">
                            <div className="col-md-4">
                                <input type="text" className="form-control border-0 py-3"
                                       placeholder="Nhập từ khóa tìm kiếm"
                                       onChange={handleNameSearchChange}/>
                            </div>
                            <div className="col-md-4">
                                <select className="form-select border-0 py-3" onChange={handleOptionChange}>
                                    <option>Khoảng giá</option>
                                    <option value="1">Dưới 2.000.000 ₫</option>
                                    <option value="2">Từ 2.000.000 ₫ - 3.000.000 ₫</option>
                                    <option value="3">Trên 3.000.000 ₫</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select className="form-select border-0 py-3" onChange={handleOptionLocalChange}>
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
    );
};

export default SearchHouse;