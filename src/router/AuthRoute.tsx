import React, {FC} from 'react';
import {Navigate} from "react-router-dom";
import {RouteProps} from "../types/router.types";

const REDIRECT_PATH = "/login"
const AuthRoute: FC<RouteProps> = ({isAuth, Component}) => {

    return (
        isAuth ? <Component/> : <Navigate to={REDIRECT_PATH}/>
    );
};

export default AuthRoute;