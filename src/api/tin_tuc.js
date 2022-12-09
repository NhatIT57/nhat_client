import axios from "axios";
const token = JSON.parse(localStorage.getItem("token"));
var url_upload = "api/upload";
var URL = "http://localhost:8080";
var url_tin_tuc = "api/tin_tuc";

// var url_get_loia_giay = ''
const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});
// const authAxiosDelete = axios.create({
//     baseURL: URL,

//     headers: {
//         Authorization: `Bearer ${token}`,
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//     },
// });

export const upload = (file) => {
    let formData = new FormData();
    const config = {
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "content-type": "multipart/form-data",
        },
    };
    formData.append("image", file);
    return axios.post(`${URL}/${url_upload}`, formData, config);
};

export const getTinTuc = () => {
    return authAxios.get(`/api/tin_tuc`);
};


export const pageTinTuc = (data) => {
    return authAxios.post(`/api/tin_tuc/page`, data);
};

export const updateTinTuc = (data) => {
    return authAxios.patch(`/api/tin_tuc`, data);
};

export const deleteTinTuc = (data) => {
    return authAxios.post(`/api/tin_tuc/delete`, data);
};