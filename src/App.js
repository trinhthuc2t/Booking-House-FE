import './App.css';

import Home from "./component/account/Home";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import React from "react";


function App() {
  return (
    <div className="App">
       <Home></Home>
        <ToastContainer/>
    </div>
  );
}

export default App;
