import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import EditProfile from "./crud/EditProfile";


const Home = () => {
    return (
        <div className="container">
            <h1>Welcome</h1>
            <Routes>
                <Route path={"/editProfile/:id"} element={<EditProfile/>}/>
            </Routes>
            <Link to={"/editProfile/1"}>
                <button>Sửa thông tin cá nhân</button>
            </Link>
        </div>
    );
};

export default Home;