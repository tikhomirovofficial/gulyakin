import axios from "axios";

const BASE_URL = 'http://dev.advafert.ru/api/'

const api = axios.create({
    baseURL: BASE_URL,
})

export default api