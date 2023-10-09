import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import LoginRegisterService from "../../service/login-registerService";
import Swal from "sweetalert2";
import {useState} from "react";

function ForgotPassword(){
    const [checkEmail, setCheckEmail] = useState("")
    const initialValues = {
        email: ''
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email')
    });
    const sendPassword= (value) => {
        LoginRegisterService.sendPassword(value)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Email đã được gửi!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                console.log(err)
                setCheckEmail("Không tìm thấy email")
            })
    }
    return(
        <div className="container">
        <Formik initialValues={initialValues} onSubmit={sendPassword} validationSchema={validationSchema}>
        <Form>
            <div className="form-outline mb-4">
                <Field type="text" id="email" name="email"
                       className="form-control form-control-lg"/>
                <label className="form-label" htmlFor="form3Example1cg">Nhập
                    Email</label>
                <ErrorMessage name="email" className="text-danger" component="div"/>
            </div>
            <div className="text-danger">{checkEmail}</div>
            <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Gửi email</button>
        </Form>
        </Formik>
        </div>
    )
}
export default ForgotPassword