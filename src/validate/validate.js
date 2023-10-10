import * as Yup from "yup";
import LoginRegisterService from "../service/login-registerService";

const addHouseSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Tên tối thiểu phải 2 kí tự')
        .max(20, 'Tên quá dài')
        .required('Vui lòng không được để trống'),
    bedroom: Yup.string()
        .required('Vui lòng không được để trống'),
    bathroom: Yup.string()
        .required('Vui lòng không được để trống'),
    province: Yup.string()
        .required('Vui lòng không được để trống'),
    district: Yup.string()
        .required('Vui lòng không được để trống'),
    ward: Yup.string()
        .required('Vui lòng không được để trống'),
    houseNumber: Yup.string()
        .required('Vui lòng không được để trống'),
    newPrice: Yup.number()
        .min(1, 'Giá tiền phải lớn hơn 0')
        .required('Vui lòng không được để trống'),
    oldPrice: Yup.number()
        .min(1, 'Giá tiền phải lớn hơn 0')
        .required('Vui lòng không được để trống'),
    description: Yup.string()
        .min(10, 'Mô tả tối thiểu phải 10 kí tự')
        .required('Vui lòng không được để trống'),
    facility: Yup.string()
        .min(10, 'Mô tả tối thiểu phải 10 kí tự')
        .required('Vui lòng không được để trống'),
    thumbnail: Yup.string()
        .required('Vui lòng không được để trống'),
    images: Yup.string()
        .required('Vui lòng không được để trống')
})

const loginSchema = Yup.object({
    username: Yup.string()
        .required('Vui lòng nhập tên đăng nhập')
        .test('Check username', 'Tên đăng nhập không tồn tại', async (value) => {
            const checkUser = await LoginRegisterService.checkUsername(value);
            return checkUser.data;
        }),
    password: Yup.string()
        .required('Vui lòng nhập mật khẩu')
});

const registerSchema = Yup.object({
    username: Yup.string().required('Vui lòng nhập tên đăng nhập')
        .matches(/^[A-Za-z0-9]+(?:[ _][A-Za-z0-9]+)*$/, 'Tên đăng nhập không được chứa kí tự đặc biệt')
        .test('unique', 'Tên đăng nhập đã tồn tại', async (value) => {
            let checkUsername = await LoginRegisterService.checkUsername(value);
            return !checkUsername.data;
        }),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string()
        .required('Mật khẩu không được bỏ trống')
        .min(5, 'Mật khẩu phải chứa ít nhất 5 kí tự')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
            'Mật khẩu phải chứa chữ cái viết hoa, viết thường và ký tự số'
        ),
    confirmPassword: Yup.string()
        .required('Vui lòng xác nhận lại mật khẩu')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
});

const profileSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(2, "Họ có ít nhất 2 ký tự!")
        .required("Họ không được để trống"),
    lastname: Yup.string()
        .min(2, "Tên có ít nhất 2 ký tự!")
        .required("Tên không được để trống"),
    address: Yup.string()
        .min(2, "Mô tả dài hơn 2 ký tự!")
        .required("Địa chỉ không được để trống"),
    email: Yup.string()
        .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Nhập email có dạng @gmail")
        .min(11, "Email phải dài hơn 10 ký tự!")
        .required("Email không được để trống"),
    phone: Yup.string()
        .length(10, "Số điện phải gồm 10 số!")
        .typeError("Số điện thoại phải nhập số")
        .required("Số điện thoại không được để trống"),
    province: Yup.string()
        .required('Vui lòng không được để trống'),
    district: Yup.string()
        .required('Vui lòng không được để trống'),
    ward: Yup.string()
        .required('Vui lòng không được để trống'),
   /* frontside : Yup.string()
        .required("Vui lòng chọn ảnh"),
    backside : Yup.string()
        .required("Vui lòng chọn ảnh")*/
});

export {addHouseSchema, loginSchema, registerSchema, profileSchema};