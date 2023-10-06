import './App.css';
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import Register from "./components/Login-Register/register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import Login from "./components/Login-Register/login";
import ForgotPassword from "./components/Login-Register/forgot-password";
import AddHouse from "./components/CreateHouse/AddHouse";
import HouseByIdUser from "./components/houseByIdOwner/HouseByIdUser";
import ByOwnerId from "./components/houseByIdOwner/ByOwnerId";
import ByNameAndStatus from "./components/houseByIdOwner/ByNameAndStatus";
import Footer from "./components/Footer/Footer";
import {useState} from "react";
import HomePage from "./components/HomePage/HomePage";
import EditHouse from "./components/EditHouse/EditHouse";


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
                <Route path="/add" element={<AddHouse/>}/>
                <Route path="/edit/:houseId" element={<EditHouse/>}/>
                <Route path={"/houses-owner"} element={<HouseByIdUser/>}>
                    <Route path={"/houses-owner"} element={<ByOwnerId/>}/>
                    <Route path={"/houses-owner/search/:search"} element={<ByNameAndStatus/>}/>
                    {/*<Route path={"/edit/:id"} element={}/>*/}
                </Route>
            </Routes>
            {show && <Footer/>}
        </div>
    );
}

export default App;
