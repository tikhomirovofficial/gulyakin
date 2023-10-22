import {getTokens, storeTokens} from "../storeTokens";
import {UserApi} from "../../http/api/user.api";
import {decodeToken} from "react-jwt";

export async function handleTokenRefreshedRequest(apiFunction: Function, ...args: any[]) {
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
                const tokensRes = await UserApi.RefreshToken({refresh: refreshToken});

                storeTokens({
                    access: tokensRes?.data?.access,
                    refresh: refreshToken
                });

                return await apiFunction(...args);
            } else {
                throw error;
            }
            console.log(error)
        }
    } else {
        throw new Error("No refresh token available.");
    }
}

