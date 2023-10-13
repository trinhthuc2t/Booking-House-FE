import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import instance from "../../service/axiosConfig";

function Checkin(){
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        instance.post("http://localhost:8080/api/bookings/checkin/" + id)
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