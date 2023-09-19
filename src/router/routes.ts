import Main from "../pages/Main";
import {RoutesList} from "../types/router.types";
import NeededAuth from "../pages/NeededAuth";
import Login from "../pages/Login";

export interface RoutesCollection {
    auth: RoutesList,
    public: RoutesList,
    non_auth: RoutesList
}


export const routes: RoutesCollection = {
    public: [
        {
            Component: Main,
            path: "/"
        }
    ],
    auth: [
        {
            Component: NeededAuth,
            path: "/profile"
        }
    ],
    non_auth: [
        {
            Component: Login,
            path: "/login"
        }
    ]
}
