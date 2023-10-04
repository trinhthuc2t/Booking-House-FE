import './App.css';
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";
import AdminTeamComponent from "./component/AdminTeamComponent";
import FooterComponent from "./component/FooterComponent";
import HouseByIdUser from "./components/houseByIdOwner/HouseByIdUser";
import Register from "./login-register/register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import AddHouse from "./components/AddHouse";
import ByOwnerId from "./components/houseByIdOwner/ByOwnerId";
import ByNameAndStatus from "./components/houseByIdOwner/ByNameAndStatus";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/"} element={<HouseByIdUser/>}>
                    <Route path={"/"} element={<ByOwnerId/>}/>
                    <Route path={"/search/:search"} element={<ByNameAndStatus/>}/>
                    {/*<Route path={"/edit/:id"} element={}/>*/}
                </Route>
                <Route path="/detail" element={<HouseDetail/>}/>
                <Route path="/add" element={<AddHouse/>}/>
            </Routes>
            <AdminTeamComponent/>
            <FooterComponent/>
        </div>
    );
}
export default App;
