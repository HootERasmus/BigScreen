import axios from "axios";

export const baseUrl = "http://localhost:5000";
export const baseApi = baseUrl + "/api";
export const baseChat = baseUrl + "/chathub";
export default axios.create({
  baseURL: baseApi,
  headers: {
    "Content-type": "application/json"
  }
});
