import constants from "@/config/constants";
import axios from "axios";

const baseURL = constants.apiUrl;

const Api = axios.create({
  baseURL,
  timeout: 30000,
});

export default Api;
