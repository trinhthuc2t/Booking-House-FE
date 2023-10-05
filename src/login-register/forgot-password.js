import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import LoginRegisterService from "../service/login-registerService";

function ForgotPassword(){
    const initialValues = {
        email: ''
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email')
    });
    const sendPassword= (value) => {
        LoginRegisterService.sendPassword(value)
            .then(() => {
                alert("Email đã được gửi")
            })
            .catch(err => {
                console.log(err)
                alert("Vui lòng nhập email mà bạn đã đăng ký")
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
                <ErrorMessage name="username" className="text-danger" component="div"/>
            </div>

            <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Gửi email</button>
        </Form>
        </Formik>
        </div>
    )
}
export default ForgotPassword