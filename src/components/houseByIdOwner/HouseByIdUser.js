import React, {useState} from 'react';
import {Outlet, useNavigate, useParams} from "react-router-dom";

const HouseByIdUser = () => {
    const navigate = useNavigate();
    const {search} = useParams();

    const [selectedOption, setSelectedOption] = useState("");
    const [nameSearch, setNameSearch] = useState(search || "");

    const handleOptionChange = (event) => {
        const optionValue = event.target.value;
        setSelectedOption(optionValue);
        navigate(optionValue);
        setNameSearch("")
    };
    const handleNameSearch = (event) => {
        const nameSearch = event.target.value;
        setNameSearch(nameSearch);
        if (nameSearch.trim() !== "") {
            navigate(`/search/${nameSearch}`);
        } else {
            navigate("/");
            setSelectedOption("/")
        }
    };


    return (
        <div>
            <div className="container-fluid mb-5 wow fadeIn" data-wow-delay="0.1s"
                 style={{padding: 35, backgroundColor: "rgb(0,185,142)"}}>
                <div className="container">
                    <div className="row g-2">
                        <div className="col-md-12">
                            <div className="row g-2">
                                <div className="col-md-4">
                                    <select name="" id="" className="form-select border-0" value={selectedOption}
                                            onChange={handleOptionChange}>
                                        <option value="/">Tất cả</option>
                                        <option value="/search/available">Đang trống</option>
                                        <option value="/search/booked">Đang cho thuê</option>
                                        <option value="/search/repair">Đang bảo trì</option>
                                    </select>
                                </div>

                                <div className="col-md-8">
                                    <input type="text" className="form-control border-0" placeholder="Search" name=""
                                           id="" value={nameSearch} onInput={handleNameSearch}/>
                                < /div>
                            </div>
                        </div>

                        {/*<div className="col-md-2">*/}
                        {/*    <button className="btn btn-dark border-0 w-100">Search</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
            <Outlet></Outlet>
        </div>

    )
};

export default HouseByIdUser;