import React, {useEffect, useState} from 'react';
import Banner from "./Banner";
import AdminTeam from "./AdminTeam";
import HouseComponent from "./HouseComponent";
import houseByIdService from "../../service/HouseByIdService";
import SearchHouse from "./SearchHouse";
import Top5BookingHouse from "./Top5BookingHouse";

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nameSearch, setNameSearch] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [province, setProvince] = useState("");
    const [houses, setHouses] = useState([]);

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const getAllHouseByPriceAndProvince = (currentPage, nameSearch, province, minPrice, maxPrice) => {
        houseByIdService.getAllHouseByPriceAndProvince(currentPage, nameSearch, province, minPrice, maxPrice)
            .then((houses) => {
                setHouses(houses.content);
                setTotalPages(houses.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllHouseByPriceAndProvince(currentPage - 1, nameSearch, province, minPrice, maxPrice)
    }, [currentPage, nameSearch, province, minPrice, maxPrice])


    return (
        <div className="container-home">
            <Banner/>

            {/*Search begin*/}
            <SearchHouse setNameSearch={setNameSearch} setMinPrice={setMinPrice}
                         setMaxPrice={setMaxPrice} setProvince={setProvince} setCurrentPage={setCurrentPage}/>
            {/*Search End*/}

            <div className="container py-5">
                <h2>Top 5 ngôi nhà có nhiều lượt đặt thuê nhất</h2>
                <Top5BookingHouse/>
                <br/>
                <br/>
                <HouseComponent houses={houses} totalPages={totalPages} changePage={changePage}/>

                <AdminTeam/>
            </div>
        </div>
    );
};

export default HomePage;