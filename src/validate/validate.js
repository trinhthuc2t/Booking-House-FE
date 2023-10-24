import * as Yup from "yup";
import LoginRegisterService from "../service/login-registerService";

const saveHouseSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Tên tối thiểu phải 2 kí tự')
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
    price: Yup.number()
        .min(1, 'Giá tiền phải lớn hơn 0')
        .required('Vui lòng không được để trống'),
    sale: Yup.number()
        .min(0, 'Giảm giá phải lớn hơn hoặc bằng 0')
        .max(100, 'Giảm giá phải nhỏ hơn hoặc bằng 100')
        .required('Vui lòng không được để trống'),
    area: Yup.number()
        .min(1, 'Diện tích phải lớn hơn 0')
        .required('Vui lòng không được để trống'),
    description: Yup.string()
        .required('Vui lòng không được để trống'),
    facility: Yup.string()
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
    email: Yup.string().email('Email không hợp lệ')
        .required('Vui lòng nhập email')
        .test('unique', 'Email đã tồn tại', async (value) => {
            let checkEmail = await LoginRegisterService.checkEmail(value);
            return !checkEmail.data;
        }),
    password: Yup.string()
        .required('Mật khẩu không được bỏ trống')
        .min(6, 'Mật khẩu phải chứa ít nhất 6 kí tự')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
            'Mật khẩu phải chứa chữ cái viết hoa, viết thường và ký tự số'
        ),
    confirmPassword: Yup.string()
        .required('Vui lòng xác nhận lại mật khẩu')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
});

const forgotPasswordSchema = Yup.object({
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email')
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
        .required("Số điện thoại không được để trống")
        .matches(/^0[0-9]{9}$/, "Số điện thoại phải bắt đầu bằng số 0 và gồm 10 chữ số!"),
    province: Yup.string()
        .required('Vui lòng không được để trống'),
    district: Yup.string()
        .required('Vui lòng không được để trống'),
    ward: Yup.string()
        .required('Vui lòng không được để trống'),
});
const blankRegex = /[\s]/
const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required('Mật khẩu không được bỏ trống'),
    newPassword: Yup.string()
        .min(6, "Mật khẩu có độ dài 6-18 ký tự!")
        .max(18, "Mật khẩu có độ dài 5-18 ký tự!")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
            'Mật khẩu phải chứa chữ cái viết hoa, viết thường và ký tự số'
        )
        .required("Mật khẩu không được để trống")
        .test('no-whitespance', "Mật không để trống hoặc chứa dấu cách", function (value) {
            return !blankRegex.test(value);
        }),
    confirmNewPassword: Yup.string()
        .required('Vui lòng xác nhận lại mật khẩu')
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp')
});

const reviewSchema = Yup.object().shape({
    comment: Yup.string()
        .required('Vui lòng không được để trống')
});

export {
    saveHouseSchema,
    loginSchema,
    registerSchema,
    profileSchema,
    changePasswordSchema,
    forgotPasswordSchema,
    reviewSchema
};