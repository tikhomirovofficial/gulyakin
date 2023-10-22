import axios, {Axios, AxiosResponse} from 'axios'
import {getCookie, setCookie} from "../../utils/CookieUtil";
import {JWT} from "../../types/api.types";
import {UserApi} from "../api/user.api";
import {getTokens, storeTokens} from "../../utils/storeTokens";

const authApi = axios.create({
    baseURL: 'http://dev.advafert.ru/api/',
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${getCookie('tokens')?.access}`,
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    }
})
export const api = axios.create({
    baseURL: 'http://dev.advafert.ru/api/',
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    }
})



//let _isRetried = false


authApi.interceptors.response.use(null, (ctx) => {
    const res = ctx
    if(res.code == "ERR_NETWORK") {
        //alert("ошибка интернета")
    }
})

authApi.interceptors.request.use((config) => {
    const tokens = getTokens(); // Получите актуальные токены
    if (tokens?.access) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default authApi