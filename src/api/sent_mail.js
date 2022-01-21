import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

var URL = "https://nhat-api.herokuapp.com";

const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

export const sendMail = (data) => {
    return authAxios.post(`${URL}/send-email`, data);
};
