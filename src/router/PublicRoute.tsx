import React, {FC} from 'react';
import {Navigate} from "react-router-dom";
import {RouteProps} from "../types/router.types";

const PublicRoute: FC<RouteProps> = ({Component}) => {
    return <Component/>

};

export default PublicRoute;