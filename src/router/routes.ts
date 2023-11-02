import Main from "../pages/Main";
import {RoutesList} from "../types/router.types";
import NeededAuth from "../pages/NeededAuth";
import Login from "../pages/Login";
import Restaurants from "../pages/Restaurants";
import ChosenRestaurant from "../pages/ChosenRestaurant";
import Profile from "../pages/Profile";
import Order from "../pages/Order";
import WithOrder from "../pages/Order/withOrder";
import {BaseRedirect} from "../components/ServiceComponents";

export interface RoutesCollection {
    auth: RoutesList,
    public: RoutesList,
    non_auth: RoutesList
}

const BASE_PATH =  "/market/:id"


export const routes: RoutesCollection = {
    public: [
        {
            Component: BaseRedirect,
          path: "/"
        },
        {
            Component: Main,
            path: BASE_PATH
        },
        {
            Component: Restaurants,
            path: BASE_PATH + "/restaurants"
        },
        {
            Component: ChosenRestaurant,
            path: BASE_PATH + "/restaurants/:id"
        }


    ],
    auth: [
        {
            Component: Profile,
            path: "/profile"
        },
        {
            Component: Order,
            path: BASE_PATH + "/order"
        }
    ],
    non_auth: [
        {
            Component: Login,
            path: "/login"
        }
    ]
}
