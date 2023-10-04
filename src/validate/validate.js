import * as Yup from "yup";

const addHouseSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Tên tối thiểu phải 2 kí tự')
        .max(20, 'Tên quá dài')
        .required('Vui lòng không được để trống'),
    bedRoom: Yup.string()
        .required('Vui lòng không được để trống'),
    livingRoom: Yup.string()
        .required('Vui lòng không được để trống'),
    province: Yup.string()
        .required('Vui lòng không được để trống'),
    district: Yup.string()
        .required('Vui lòng không được để trống'),
    ward: Yup.string()
        .required('Vui lòng không được để trống'),
    address: Yup.string()
        .required('Vui lòng không được để trống'),
})

export {addHouseSchema};