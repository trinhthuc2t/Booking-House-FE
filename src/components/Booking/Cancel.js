import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Cancel() {
    const {id} = useParams()
    const navigate = useNavigate()
    Swal.fire({
        title: 'Bạn có chắc chắn muốn huỷ không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có, thay đổi!'
    })
        .then(() => {
                axios.post("http://localhost:8080/api/bookings/cancel/" + id)
                    .then((res) => {
                        console.log(res)
                        navigate("/booking/list")
                    })
                    .catch(err => {
                        console.log(err)
                        Swal.fire({
                            icon: 'error',
                            title: 'Không thể huỷ',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })

        })

}

export default Cancel