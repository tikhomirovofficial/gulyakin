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



let _isRetried = false
authApi.interceptors.response.use(null, (ctx) => {
    const res = ctx.response
    console.log(res)
    const resDataCode = res.data.code

    if (resDataCode === 'token_not_valid' && !_isRetried) {
        _isRetried = true
        const requestConfig = res.config
        const tokens = getTokens()
        const refreshToken = tokens.refresh


        const response = UserApi.RefreshToken({refresh: refreshToken})
            .then((tokensRes: JWT) => {
                storeTokens({
                    access: tokensRes.access,
                    refresh: refreshToken
                })


                requestConfig.headers.Authorization = `Bearer ${tokensRes.access}`
                axios.request(requestConfig).then((res) => {
                    return res
                })
            })
        return response
    }
    return ctx.response

})

export default authApi