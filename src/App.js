import './App.css';
import {Route, Routes} from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";
import AdminTeamComponent from "./component/AdminTeamComponent";
import FooterComponent from "./component/FooterComponent";
import HouseByIdUser from "./component/HouseByIdUser";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import AddHouse from "./components/AddHouse";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path={"/"} element={<HouseByIdUser/>}/>
                <Route path="/detail" element={<HouseDetail/>}/>
                <Route path="/add" element={<AddHouse/>}/>
            </Routes>
            <AdminTeamComponent/>
            <FooterComponent/>
        </div>
    );
}
export default App;
