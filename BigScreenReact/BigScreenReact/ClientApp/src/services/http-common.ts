import axios from "axios";

export const baseUrl ="http://192.168.1.19:5000";
export const baseApi = baseUrl + "/api";
export const baseChat = baseUrl + "/chathub";
export default axios.create({
  baseURL: baseUrl + "api",
  headers: {
    "Content-type": "application/json"
  }
});
