import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import instance from "../../service/axiosConfig";

function Checkout(){

    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        instance.post("http://localhost:8080/api/bookings/checkout/" + id)
            .then((res) => {
                console.log(res)
                navigate("/profile/houses-search")
            })
            .catch(err => {
                console.log(err)
            })
    })
}
export default Checkout