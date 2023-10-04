import './App.css';

import Home from "./component/account/Home";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import EditProfile from "./component/account/crud/EditProfile";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={"/editProfile/:id"} element={<EditProfile/>}/>
        </Routes>
        <ToastContainer/>
    </div>
  );
}

export default App;
