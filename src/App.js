import './App.scss';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import HouseByIdUser from "./components/Profile/HouseByIdOwner/HouseByIdUser";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile/EditProfile";
import ChangePassword from "./components/Profile/ChangePassword/ChangePassword";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import SaveHouse from "./components/CreateAndEditHouse/SaveHouse";
import Information from "./components/Profile/Information/Information";
import Login from "./components/Login-Register/Login/Login";
import ForgotPassword from "./components/Login-Register/ForgotPassword/ForgotPassword";
import Register from "./components/Login-Register/Register/Register";
import Statistical from "./components/Profile/Statistical/Statistical";
import SearchBooking from "./components/Profile/SearchBooking/SearchBooking";
import RegisterOwner from "./components/Profile/RegisterOwner/RegisterOwner";
import ConfirmOwner from "./components/Profile/ConfirmOwner/ConfirmOwner";
import RentalHistory from "./components/Profile/RentalHistory/RentalHistory";
import ListAccount from "./components/Profile/Account/ListAccount";
import UserList from "./components/Profile/Account/UserList";
import ListOwner from "./components/Profile/Account/ListOwner";
import ContactAdmin from "./components/Login-Register/ContactAdmin/ContactAdmin";
import Component404 from "./errorClient/Component404";
import Component403 from "./errorClient/Component403";
import ChatBox from "./components/ChatBox/ChatBox";


function App() {
    const [show, setShow] = useState(true);
    return (
        <div className="App">
            {show && <NavbarComponent/>}
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/register"} element={<Register setShow={setShow}/>}/>
                <Route path="/house-detail/:houseId" element={<HouseDetail/>}/>
                <Route path={"/login"} element={<Login setShow={setShow}/>}/>
                <Route path={"/forgot-password"} element={<ForgotPassword setShow={setShow}/>}/>
                <Route path={"/contact-admin"} element={<ContactAdmin/>}  />
                <Route path="/add-house" element={<SaveHouse/>}/>
                <Route path="/edit-house/:houseId" element={<SaveHouse/>}/>
                <Route path="/chat" element={<ChatBox/>}/>
                <Route path={"/profile/"} element={<Profile/>}>
                    <Route path={"edit-profile"} element={<EditProfile status={true}/>}/>
                    <Route path={"register-owner"} element={<RegisterOwner/>}/>
                    <Route path={"change-password"} element={<ChangePassword/>}/>
                    <Route path={"information"} element={<Information/>}/>
                    <Route path={"houses-owner"} element={<HouseByIdUser/>}/>
                    <Route path={"houses-owner-revenue"} element={<Statistical/>}/>
                    <Route path={"houses-owner-booking"} element={<SearchBooking/>}/>
                    <Route path={"list-Account"} element={<ListAccount/>}/>
                    <Route path={"list-user"} element={<UserList/>}/>
                    <Route path={"list-owner"} element={<ListOwner/>}/>
                    <Route path={"confirm-owner"} element={<ConfirmOwner/>}/>
                    <Route path={"rental-history"} element={<RentalHistory/>}/>
                </Route>
                <Route path={'*'} element={<Navigate to="/404" replace />}/>
                <Route path={'/index.html'} element={<Navigate to="/" replace />}/>
                <Route path="/404" element={<Component404/>}></Route>
                <Route path={'/403'} element={<Component403/>}></Route>
            </Routes>
            {show && <Footer/>}
            <ToastContainer/>
        </div>
    );
}

export default App;
