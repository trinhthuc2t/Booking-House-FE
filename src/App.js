import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import Register from "./components/Login-Register/register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import Login from "./components/Login-Register/login";
import ForgotPassword from "./components/Login-Register/forgot-password";
import HouseByIdUser from "./components/houseByIdOwner/HouseByIdUser";
import ByOwnerId from "./components/houseByIdOwner/ByOwnerId";
import ByNameAndStatus from "./components/houseByIdOwner/ByNameAndStatus";
import Profile from "./account/crud/Profile";
import EditProfile from "./account/crud/EditProfile";
import ChangePassword from "./account/crud/ChangePassword";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import SaveHouse from "./components/CreateAndEditHouse/SaveHouse";
import BodyProfile from "./account/crud/BodyProfile";


function App() {
    const [show, setShow] = useState(true);
    return (
        <div className="App">
            {show && <NavbarComponent/>}
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/register"} element={<Register setShow={setShow}/>}/>
                <Route path="/house-detail/:houseId" element={<HouseDetail/>}/>
                <Route path={"/login"} element={<Login setShow={setShow} />}/>
                <Route path={"/forgot"} element={<ForgotPassword/>}/>
                <Route path="/add" element={<SaveHouse/>}/>
                <Route path="/edit/:houseId" element={<SaveHouse/>}/>
                <Route path={"/houses-owner"} element={<HouseByIdUser/>}>
                    <Route path={"/houses-owner"} element={<ByOwnerId/>}/>
                    <Route path={"/houses-owner/search/:search"} element={<ByNameAndStatus/>}/>
                </Route>
                <Route path={"/profile/"} element={<Profile/>}>
                    <Route path={"editProfile"}  element={<EditProfile status={true}/>}/>
                    <Route path={"registerOwner"}  element={<EditProfile status={false}/>}/>
                    <Route path={"changePassword"} element={<ChangePassword/>}/>
                    <Route path={"information"} element={<BodyProfile/>}/>

                </Route>


            </Routes>
            <Footer/>
            <ToastContainer/>
        </div>
    );
}

export default App;
