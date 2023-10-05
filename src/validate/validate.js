import * as Yup from "yup";

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

export {addHouseSchema};