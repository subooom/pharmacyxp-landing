import axios from "axios";

const baseURL = "http://localhost:8000/api/";

const Api = axios.create({
  baseURL,
  timeout: 10000,
});

export default Api;
