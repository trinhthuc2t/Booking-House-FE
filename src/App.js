import './App.css';
import {Route, Routes} from "react-router-dom";
import Register from "./login-register/register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import AddHouse from "./components/AddHouse";
import Login from "./login-register/login";
import ByOwnerId from "./components/houseByIdOwner/ByOwnerId";
import ByNameAndStatus from "./components/houseByIdOwner/ByNameAndStatus";
import NavbarComponent from "./component/NavbarComponent";
import HouseByIdUser from "./components/houseByIdOwner/HouseByIdUser";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path="/" element={<HouseDetail/>}/>
                <Route path={"/"} element={<HouseByIdUser/>}>
                    <Route path={"/"} element={<ByOwnerId/>}/>
                    <Route path={"/search/:search"} element={<ByNameAndStatus/>}/>
                    {/*<Route path={"/edit/:id"} element={}/>*/}
                </Route>
                <Route path="/detail" element={<HouseDetail/>}/>
                <Route path="/add" element={<AddHouse/>}/>
            </Routes>
        </div>
    );
}

export default App;
