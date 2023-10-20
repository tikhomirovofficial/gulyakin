import React, {FC, useEffect} from 'react';
import {Navigate} from "react-router-dom";
import {RouteProps} from "../types/router.types";
import {getUser} from "../features/profile/profileSlice";
import {useAppDispatch} from "../app/hooks";
import {deleteCookie, getCookie} from "../utils/CookieUtil";
import useToken from "../hooks/useToken";
import {handleLogin} from "../features/modals/modalsSlice";

const REDIRECT_PATH = "/";

const AuthRoute: FC<RouteProps> = ({Component}) => {
    const dispatch = useAppDispatch();
    const token = useToken()

    useEffect(() => {
        if (token) {
            dispatch(getUser());
        }
    }, [dispatch, token]);

    if (!token) {
        if (getCookie('tokens')) {
            deleteCookie("tokens")
        }
        dispatch(handleLogin())
        return <Navigate to={REDIRECT_PATH}/>;
    }

    return <Component/>;
};


export default AuthRoute;