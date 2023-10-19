import {JWT, LoginRequest, LoginResponse, RegistrationRequest, RegistrationResponse} from "../../types/api.types";
import {AxiosResponse} from "axios";
import api from "../instance/instances";
import {UserData} from "../../types/user.types";
import {PATHS} from "./path.api";

export class ProductsApi {
    static async getProductsByMarket(requestData: any): Promise<any> {
        const res: AxiosResponse<LoginResponse> = await api.post(PATHS.USER_LOGIN, {...requestData});
    }



}