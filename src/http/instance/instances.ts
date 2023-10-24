import axios from 'axios'
import {getCookie} from "../../utils/CookieUtil";
import {getTokens} from "../../utils/storeTokens";

const isDev = false

const devDomain = "http://dev.advafert.ru"
const prodDomain = "https://api.client.advafert.ru"
export const domain = isDev ? devDomain : prodDomain
const URL = domain + "/api"

const authApi = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${getCookie('tokens')?.access}`,
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    }
})
export const api = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    }
})


//let _isRetried = false


authApi.interceptors.response.use(null, (ctx) => {
    const res = ctx
    if (res.code == "ERR_NETWORK") {
        //alert("ошибка интернета")
    }
    return res
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