import './App.css';
import {Route, Routes} from "react-router-dom";
import Register from "./login-register/register";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/register"} element={<Register/>}/>
            </Routes>
        </div>
    );
}

export default App;
