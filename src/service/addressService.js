import axios from "axios";

const URL_API = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const token = '4fcabb9b-6068-11ee-af43-6ead57e9219a';

const getAllProvinces = () =>{
    return axios.get(`${URL_API}/province`, {
        headers: {token: token}
    });
}

const getAllDistrictsByProvinceId = (provinceId)=>{
    return axios.post(`${URL_API}/district`, {
        province_id: provinceId
    }, {
        headers: {token: token}
    });
}

const getAllWardsByDistrictId = (districtId)=>{
    return axios.post(`${URL_API}/ward`, {
        district_id: districtId
    }, {
        headers: {token: token}
    });
}

export {getAllProvinces, getAllDistrictsByProvinceId, getAllWardsByDistrictId};