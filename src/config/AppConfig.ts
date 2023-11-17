import {OrderWarning} from "../features/main/mainSlice";

type AppConfig = {
    ADDRESS_KEYS_EXCEPTIONS: string[]
    MAPS_API_KEY: string
    MAPS_API_SECRET: string
    MAX_SUGGESTIONS_COUNT: number,
    ORDER_WARNINGS: Record<string, OrderWarning>
}
const appConfig: AppConfig = {
    ADDRESS_KEYS_EXCEPTIONS: ["entrance", "code_door", "floor", "flat"],
    MAPS_API_KEY: "f1a3a020c2b3500e27d2b97056a665c61417b92f",
    MAPS_API_SECRET: "9f86f99b27196405eb3f30599f882002e953e33c",
    MAX_SUGGESTIONS_COUNT: 20,

    ORDER_WARNINGS: {
        CART_SUM_SMALL: {
            title: "",
            description: ""
        },
        CART_EMPTY: {
            title: "",
            description: ""
        },
        CANNOT_ORDER: {
            title: "",
            description: ""
        }
    }
}
export {
    appConfig
}