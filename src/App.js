import './App.css';
import {Route, Routes} from "react-router-dom";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import AddHouse from "./components/CreateHouse/AddHouse";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/house-detail/:houseId" element={<HouseDetail/>}/>
            <Route path="/add" element={<AddHouse/>}/>
        </Routes>
    </div>
  );
}

export default App;
