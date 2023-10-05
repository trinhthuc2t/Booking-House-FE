import './App.css';
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";
import HouseComponent from "./component/HouseComponent";
import Register from "./login-register/register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import Login from "./login-register/login";
import ForgotPassword from "./login-register/forgot-password";
import AddHouse from "./components/CreateHouse/AddHouse";
import HouseByIdUser from "./components/houseByIdOwner/HouseByIdUser";
import ByOwnerId from "./components/houseByIdOwner/ByOwnerId";
import ByNameAndStatus from "./components/houseByIdOwner/ByNameAndStatus";
import Footer from "./component/Footer";


function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path={"/"} element={<HouseComponent/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path="/house-detail/:houseId" element={<HouseDetail/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/forgot"} element={<ForgotPassword/>}/>
                <Route path="/add" element={<AddHouse/>}/>
                <Route path={"/houses-owner"} element={<HouseByIdUser/>}>
                    <Route path={"/houses-owner"} element={<ByOwnerId/>}/>
                    <Route path={"/houses-owner/search/:search"} element={<ByNameAndStatus/>}/>
                    {/*<Route path={"/edit/:id"} element={}/>*/}
                </Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
