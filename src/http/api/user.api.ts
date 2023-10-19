import {
    GetUserDataResponse,
    JWT,
    LoginRequest,
    LoginResponse,
    RegistrationRequest,
    RegistrationResponse
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import authApi, {api} from "../instance/instances";
import {UserData} from "../../types/user.types";
import {PATHS} from "./path.api";

export class UserApi {
    static async Registration(requestData: RegistrationRequest): Promise<RegistrationResponse> {
        const res: AxiosResponse<RegistrationResponse> = await api.post(PATHS.USER_REGISTER, {...requestData})
        return res.data
    }

    static async Login(requestData: LoginRequest): Promise<LoginResponse>{
        const res: AxiosResponse<LoginResponse> = await api.post(PATHS.USER_LOGIN, {...requestData});
        // if(res.status == 401 && res.data.detail) {
        //     return null
        // }
        return res.data;
    }

    static async User(): Promise<GetUserDataResponse> {
        const res: AxiosResponse<GetUserDataResponse> = await authApi.get(PATHS.USER_GET);
        return res.data;
    }

    static async RefreshToken(requestData: JWT): Promise<JWT> {
        const res: AxiosResponse<JWT> = await authApi.post(PATHS.USER_TOKEN_REFRESH, {...requestData})
        return res.data;
    }


}