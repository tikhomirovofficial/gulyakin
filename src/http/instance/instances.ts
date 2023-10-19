import axios, {Axios, AxiosResponse} from 'axios'
import {getCookie, setCookie} from "../../utils/CookieUtil";
import {JWT} from "../../types/api.types";
import {UserApi} from "../api/user.api";

const api = axios.create({
    baseURL: 'http://dev.advafert.ru/api/',
    headers: {
        Authorization: `Bearer ${getCookie('tokens')?.access}`,
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    }
})

let _isRetried = false
api.interceptors.response.use(null, (ctx) => {
    const res = ctx.response as AxiosResponse
    const resDataCode = res.data.code

    if (resDataCode === 'token_not_valid' && !_isRetried) {
        _isRetried = true
        const requestConfig = res.config
        const tokens = getCookie("tokens") as JWT
        const refreshToken = tokens.refresh

        const response = UserApi.RefreshToken({refresh: refreshToken})
            .then((tokensRes: JWT) => {
                setCookie("tokens", {
                    access: tokensRes.access,
                    refresh: refreshToken
                }, 30)

                requestConfig.headers.Authorization = `Bearer ${tokens.access}`
                axios.request(requestConfig).then((res) => {
                    return res
                })
            })
        return response
    }
    return ctx.response

})

export default api