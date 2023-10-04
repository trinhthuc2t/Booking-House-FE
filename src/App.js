import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import AddHouse from "./components/AddHouse";
import EditProfile from "./component/account/crud/EditProfile";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HouseDetail/>}/>
            <Route path="/add" element={<AddHouse/>}/>
            <Route path={"/editProfile/:id"} element={<EditProfile/>}/>
        </Routes>
        <ToastContainer/>
    </div>
  );
}

export default App;
