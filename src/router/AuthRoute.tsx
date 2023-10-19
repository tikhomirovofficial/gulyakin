import React, {FC, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {RouteProps} from "../types/router.types";
import {getTokens} from "../utils/storeTokens";
import {UserApi} from "../http/api/user.api";

const REDIRECT_PATH = "/"
const AuthRoute: FC<RouteProps> = ({Component}) => {
    const tokens = getTokens()
    const navigate = useNavigate()

    useEffect(() => {
        if (!tokens?.refresh) {
            navigate(REDIRECT_PATH)
        }


        UserApi.User()
            .then(({status}) => {
                if (!status) {
                    alert("ne status")
                    navigate(REDIRECT_PATH)
                }
            })
    }, [])


    return (
        <Component/>
    );
};

export default AuthRoute;