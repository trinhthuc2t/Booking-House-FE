import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import HouseByIdUser from "./components/Profile/houseByIdOwner/HouseByIdUser";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import ChangePassword from "./components/Profile/ChangePassword";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import SaveHouse from "./components/CreateAndEditHouse/SaveHouse";
import Checkin from "./components/Booking/Checkin";
import Checkout from "./components/Booking/Checkout";
import Information from "./components/Profile/Information";
import Login from "./components/Login-Register/Login";
import ForgotPassword from "./components/Login-Register/ForgotPassword";
import Register from "./components/Login-Register/Register";
import Cancel from "./components/Booking/Cancel";

import Statistical from "./components/Profile/statistical/Statistical";
import SearchBooking from "./components/Profile/searchBooking/SearchBooking";
import RegisterOwner from "./components/Profile/RegisterOwner";
import ConfirmOwner from "./components/Profile/ConfirmOwner";
import RentalHistory from "./components/Profile/RentalHistory";


function App() {
    const [show, setShow] = useState(true);
    return (
        <div className="App">
            {show && <NavbarComponent/>}
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/owner/checkin/:id"} element={<Checkin/>}/>
                <Route path={"/owner/checkout/:id"} element={<Checkout/>}/>
                <Route path={"/owner/cancel/:id"} element={<Cancel/>}/>
                <Route path={"/register"} element={<Register setShow={setShow}/>}/>
                <Route path="/house-detail/:houseId" element={<HouseDetail/>}/>
                <Route path={"/login"} element={<Login setShow={setShow} />}/>
                <Route path={"/forgot-password"} element={<ForgotPassword setShow={setShow}/>}/>
                <Route path="/add-house" element={<SaveHouse/>}/>
                <Route path="/edit-house/:houseId" element={<SaveHouse/>}/>
                <Route path={"/profile/"} element={<Profile/>}>
                    <Route path={"edit-profile"}  element={<EditProfile status={true}/>}/>
                    <Route path={"register-owner"}  element={<RegisterOwner />}/>
                    <Route path={"change-password"} element={<ChangePassword/>}/>
                    <Route path={"information"} element={<Information/>}/>
                    <Route path={"houses-owner"} element={<HouseByIdUser/>}/>
                    <Route path={"houses-statistical"} element={<Statistical/>}/>
                    <Route path={"houses-search"} element={<SearchBooking/>}/>
                    <Route path={"confirm-owner"} element={<ConfirmOwner/>}/>
                    <Route path={"rental-history"} element={<RentalHistory/>}/>
                </Route>
            </Routes>
            {show && <Footer/>}
            <ToastContainer/>
        </div>
    );
}

export default App;
