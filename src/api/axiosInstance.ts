import axios from "axios";

export const BASE_URL = 'https://client.st.com.tm/'
export const axiosInstance = axios.create({
    baseURL:BASE_URL
})