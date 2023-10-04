import './App.css';
import {Route, Routes} from "react-router-dom";
<<<<<<< HEAD
import NavbarComponent from "./component/NavbarComponent";
import AdminTeamComponent from "./component/AdminTeamComponent";
import FooterComponent from "./component/FooterComponent";
import HouseByIdUser from "./component/HouseByIdUser";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>
                    <Routes>
                        <Route path={"/"} element={<HouseByIdUser/>}/>
                    </Routes>
            <AdminTeamComponent/>
            <FooterComponent/>
        </div>
    );
=======
import HouseDetail from "./components/HouseDetail/HouseDetail";
import AddHouse from "./components/AddHouse";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HouseDetail/>}/>
            <Route path="/add" element={<AddHouse/>}/>
        </Routes>
    </div>
  );
>>>>>>> 58635272a535e0a3955da894ebad9d0e2e6143b1
}

export default App;
