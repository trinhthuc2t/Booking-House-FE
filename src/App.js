import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import AddHouse from "./components/AddHouse";
import EditProfile from "./account/crud/EditProfile";
import ChangePassword from "./account/crud/ChangePassword";
import Profile from "./account/crud/Profile";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HouseDetail/>}/>
            <Route path="/add" element={<AddHouse/>}/>
            <Route path={"/profile/:id"} element={<Profile/>}/>
            <Route path={"/editProfile/:id"} element={<EditProfile/>}/>
            <Route path={"/changePassword/:id"} element={<ChangePassword/>}/>
        </Routes>
        <ToastContainer/>
    </div>
  );
}

export default App;
