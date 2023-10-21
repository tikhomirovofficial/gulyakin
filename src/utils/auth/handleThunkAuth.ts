import {getTokens, storeTokens} from "../storeTokens";
import {UserApi} from "../../http/api/user.api";
import {decodeToken} from "react-jwt";
import {AxiosResponse} from "axios";

export async function handleTokenRefreshedRequest<ResType>(apiFunction: Function, ...args: any[]) {
    const tokens = getTokens();
    const refresh = getTokens()?.refresh

    const decoded = decodeToken(refresh || "") as { user_id?: string } || {};
    const hasUserId = "user_id" in decoded;
    const isRefreshValid = !!(refresh && hasUserId);

    if (isRefreshValid) {
        try {
            return await apiFunction(...args);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                const refreshToken = tokens.refresh;
                const tokensRes = await UserApi.RefreshToken({ refresh: refreshToken });

                storeTokens({
                    access: tokensRes.access,
                    refresh: refreshToken
                });

                return await apiFunction(...args) as AxiosResponse<ResType>;
            } else {
                throw error;
            }
        }
    } else {
        throw new Error("No refresh token available.");
    }
}

