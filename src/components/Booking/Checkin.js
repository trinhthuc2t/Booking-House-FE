import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

function Checkin(){
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.post("http://localhost:8080/api/bookings/checkin/" + id)
            .then((res) => {
                console.log(res)
                navigate("/profile/houses-search")
            })
            .catch(err => {
                console.log(err)
            })
    })
}
export default Checkin