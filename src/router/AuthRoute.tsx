import React, {FC} from 'react';
import {Navigate} from "react-router-dom";
import {RouteProps} from "../types/router.types";
import {useAppSelector} from "../app/hooks";

const REDIRECT_PATH = "/login"
const AuthRoute: FC<RouteProps> = ({Component}) => {
    const {isAuth} = useAppSelector(state => state.profile)
    return (
        isAuth ? <Component/> : <Navigate to={REDIRECT_PATH}/>
    );
};

export default AuthRoute;