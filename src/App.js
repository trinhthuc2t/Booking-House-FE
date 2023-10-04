import './App.css';
import {Route, Routes} from "react-router-dom";
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
}

export default App;
