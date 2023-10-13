import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {useEffect} from "react";

function Cancel() {
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.post("http://localhost:8080/api/bookings/cancel/" + id)
            .then((res) => {
                console.log(res)
                navigate("/profile/houses-search")
            })
            .catch(err => {
                console.log(err)
            })
    })
}

export default Cancel