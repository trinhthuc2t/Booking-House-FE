import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";
import HouseComponent from "./component/HouseComponent";
import Register from "./login-register/register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import ForgotPassword from "./login-register/forgot-password";
import Login from "./login-register/login";
import AddHouse from "./components/CreateHouse/AddHouse";
import HouseByIdUser from "./components/houseByIdOwner/HouseByIdUser";
import ByOwnerId from "./components/houseByIdOwner/ByOwnerId";
import ByNameAndStatus from "./components/houseByIdOwner/ByNameAndStatus";
import Profile from "./account/crud/Profile";
import EditProfile from "./account/crud/EditProfile";
import ChangePassword from "./account/crud/ChangePassword";
import Footer from "./component/Footer";


function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path={"/home"} element={<HouseComponent/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path="/house-detail/:houseId" element={<HouseDetail/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/forgot"} element={<ForgotPassword/>}/>
                <Route path="/" element={<HouseDetail/>}/>
                <Route path="/add" element={<AddHouse/>}/>
                <Route path={"/"} element={<HouseByIdUser/>}>
                    <Route path={"/"} element={<ByOwnerId/>}/>
                    <Route path={"/search/:search"} element={<ByNameAndStatus/>}/>
                    {/*<Route path={"/edit/:id"} element={}/>*/}
                </Route>
                <Route path={"/profile/:id"} element={<Profile/>}/>
                <Route path={"/editProfile/:id"} element={<EditProfile/>}/>
                <Route path={"/changePassword/:id"} element={<ChangePassword/>}/>
            </Routes>
            <Footer/>
            <ToastContainer/>
        </div>
    );
}

export default App;
