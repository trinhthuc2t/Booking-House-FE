import './App.css';
import {Route, Routes} from "react-router-dom";
import Register from "./login-register/register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import Login from "./login-register/login";
import ByOwnerId from "./components/houseByIdOwner/ByOwnerId";
import ByNameAndStatus from "./components/houseByIdOwner/ByNameAndStatus";
import NavbarComponent from "./component/NavbarComponent";
import HouseByIdUser from "./components/houseByIdOwner/HouseByIdUser";
import ForgotPassword from "./login-register/forgot-password";
import Footer from "./component/Footer";
import HouseComponent from "./component/HouseComponent";
import AddHouse from "./components/CreateHouse/AddHouse";

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
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
