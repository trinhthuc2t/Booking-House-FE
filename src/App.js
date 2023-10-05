import './App.css';
import {Route, Routes} from "react-router-dom";
import Register from "./login-register/register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import AddHouse from "./components/CreateHouse/AddHouse";
import Login from "./login-register/login";
import ByOwnerId from "./components/houseByIdOwner/ByOwnerId";
import ByNameAndStatus from "./components/houseByIdOwner/ByNameAndStatus";
import NavbarComponent from "./component/NavbarComponent";
import HouseByIdUser from "./components/houseByIdOwner/HouseByIdUser";
import HouseComponent from "./component/HouseComponent";

function App() {
  return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path={"/home"} element={<HouseComponent/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path="/house-detail/:houseId" element={<HouseDetail/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path="/add" element={<AddHouse/>}/>
                <Route path={"/"} element={<HouseByIdUser/>}>
                    <Route path={"/"} element={<ByOwnerId/>}/>
                    <Route path={"/search/:search"} element={<ByNameAndStatus/>}/>
                    {/*<Route path={"/edit/:id"} element={}/>*/}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
