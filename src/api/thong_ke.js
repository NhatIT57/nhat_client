
import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));
var url_upload = "api/upload";
var URL = "http://localhost:8080";
var url_them_loai_giay = "api/thong_ke";
// var url_get_loia_giay = ''

const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

export const getAllGiay = () => {
    return authAxios.get(`/api/thong_ke/getAllGiay`);
};

export const getAllLoaiGiay = () => {
    return authAxios.get(`/api/thong_ke/getAllLoaiGiay`);
};

export const getAllGiayHot = () => {
    return authAxios.get(`/api/thong_ke/getAllGiayHot`);
};

export const getGiayHotByMonth = (data) => {
    return authAxios.post(`/api/thong_ke/getGiayHotByMonth`, data);
};

export const getHotByMonth = (data) => {
    return authAxios.post(`/api/thong_ke/getHotByMonth`, data);
};

export const getLoaiGiayHotByMonth = (data) => {
    return authAxios.post(`/api/thong_ke/getLoaiGiayHotByMonth`, data);
};

export const getDoanhThu = (data) => {
    return authAxios.post(`/api/thong_ke/getDoanhThu`, data);
};

export const getVanChuyen = (data) => {
    return authAxios.post(`/api/thong_ke/getVanChuyen`, data);
};

export const getDoanhThuLG = (data) => {
    return authAxios.post(`/api/thong_ke/getDoanhThuLG`, data);
};

export const getDoanhThuMonth = (data) => {
    return authAxios.post(`/api/thong_ke/getDoanhThuMonth`, data);
};

export const getDoanhThuTongTien = (data) => {
    return authAxios.post(`/api/thong_ke/getDoanhThuTongTien`, data);
};

export const getDoanhThuTotal = (data) => {
    return authAxios.post(`/api/thong_ke/getDoanhThuTotal`, data);
};

export const getTonKho = (data) => {
    return authAxios.post(`/api/thong_ke/getTonKho`, data);
};

export const getTonKhoTongTien = () => {
    return authAxios.get(`/api/thong_ke/getTonKhoTongTien`);
};

export const getTonKhoTotal = () => {
    return authAxios.get(`/api/thong_ke/getTonKhoTotal`);
};