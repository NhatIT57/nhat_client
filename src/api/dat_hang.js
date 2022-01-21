import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));
var url_upload = "api/upload";
var URL = "https://nhat-api.herokuapp.com";
var URLS = "https://nhat-api.herokuapp.com";
var URL_THANHTOAN = "http://localhost:8888";
var url_them_dat_hang = "api/dat_hang";
// var url_get_loia_giay = ''
const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

const authAxioss = axios.create({
    baseURL: URLS,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

const authAxiosTT = axios.create({
    baseURL: URL_THANHTOAN,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

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

export const Them = (data) => {
    return authAxios.post(`/api/dat_hang`, data);
};

export const getList = () => {
    return authAxios.get(`/api/dat_hang`);
};


export const getThanhToan = (data) => {
    return authAxiosTT.get(`/order/create_payment_url`, data);
};


export const getDonHangByID = (data) => {
    return authAxios.post(`/api/dat_hang/getDonHangByID`, data);
};


export const getTinhThanh = () => {
    return authAxios.get(`/api/dat_hang/getTinhThanh`);
};

export const update = (data) => {
    return authAxios.patch(`/api/dat_hang`, data);
};

export const getGiayByID = (data) => {
    return authAxios.post(`/api/dat_hang/getGiayByID`, data);
};


export const deleteDat_hang = (data) => {
    return authAxios.post(`/api/dat_hang/delete`, data);
};

export const getDonHangByEmail = (data) => {
    return authAxios.post(`/api/dat_hang/getDonHangByEmail`, data);
};

export const getDonHangBySDT = (data) => {
    return authAxios.post(`/api/dat_hang/getDonHangBySDT`, data);
};

export const getDonHangByEmailAll = (data) => {
    return authAxios.post(`/api/dat_hang/getDonHangByEmailAll`, data);
};

export const getDonHangBySDTAll = (data) => {
    return authAxios.post(`/api/dat_hang/getDonHangBySDTAll`, data);
};

export const notifyDat_hang = (data) => {
    return authAxioss.post(`/api/notify`, data);
};