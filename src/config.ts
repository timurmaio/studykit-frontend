import _axios from "axios";

const API_URL = "http://46.101.216.31:8080";
// const API_URL = 'http://localhost:3000'

const createAxios = () => {
  return _axios.create({
    headers: { Authorization: String(localStorage.getItem("jwt_token")) },
  });
};

export { API_URL, createAxios };
