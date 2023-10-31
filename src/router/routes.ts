import Main from "../pages/Main";
import {RoutesList} from "../types/router.types";
import NeededAuth from "../pages/NeededAuth";
import Login from "../pages/Login";
import Restaurants from "../pages/Restaurants";
import ChosenRestaurant from "../pages/ChosenRestaurant";
import Profile from "../pages/Profile";
import Order from "../pages/Order";
import WithOrder from "../pages/Order/withOrder";

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
        },
        {
            Component: Restaurants,
            path: "/restaurants"
        },
        {
            Component: ChosenRestaurant,
            path: "/restaurants/:id"
        }


    ],
    auth: [
        {
            Component: Profile,
            path: "/profile"
        },
        {
            Component: Order,
            path: "/order"
        }
    ],
    non_auth: [
        {
            Component: Login,
            path: "/login"
        }
    ]
}
