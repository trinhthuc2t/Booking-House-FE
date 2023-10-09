import './App.css';
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import Register from "./components/Login-Register/register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import Login from "./components/Login-Register/login";
import ForgotPassword from "./components/Login-Register/forgot-password";
import HouseByIdUser from "./components/houseByIdOwner/HouseByIdUser";
import Footer from "./components/Footer/Footer";
import {useState} from "react";
import HomePage from "./components/HomePage/HomePage";
import SaveHouse from "./components/CreateAndEditHouse/SaveHouse";


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
                <Route path={"/houses-owner"} element={<HouseByIdUser/>}/>
            </Routes>
            {show && <Footer/>}
        </div>
    );
}

export default App;
