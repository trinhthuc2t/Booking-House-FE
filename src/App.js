import './App.css';
import {Route, Routes} from "react-router-dom";
import Register from "./login-register/register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import AddHouse from "./components/AddHouse";
import Login from "./login-register/login";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path="/" element={<HouseDetail/>}/>
                <Route path="/add" element={<AddHouse/>}/>
            </Routes>
        </div>
    );
}

export default App;
