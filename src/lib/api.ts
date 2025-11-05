import axios from "axios";

const baseURL = "https://medicinexp-staging/api/";

const Api = axios.create({
  baseURL,
  timeout: 30000,
});

export default Api;
