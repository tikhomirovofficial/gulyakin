import {JWT} from "../types/api.types";
import {getCookie, setCookie} from "./CookieUtil";

const DAYS = 30
export const storeTokens = (tokens: JWT) => {
    console.log(tokens)
    setCookie("tokens", {
        access: tokens.access,
        refresh: tokens.refresh
    }, DAYS)
}

export const getTokens = (): JWT => {
   return getCookie("tokens") as JWT
}