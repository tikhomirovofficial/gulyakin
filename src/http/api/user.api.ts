import {JWT} from "../../types/auth.types";
import {AxiosResponse} from "axios";
import api from "../instance/instances";
import {UserData} from "../../types/user.types";
import {PATHS} from "./path.api";

export class UserApi {
    static async Registration(requestData: UserData): Promise<UserData> {
        const res: AxiosResponse<UserData> = await api.post(PATHS.USER_REGISTER, {...requestData})
        return res.data
    }

    static async Login(requestData: any): Promise<any> {
        const res: AxiosResponse<any> = await api.post(PATHS.USER_LOGIN, {...requestData});
        return res.data;
    }

    static async RefreshToken(requestData: JWT): Promise<JWT> {
        const res: AxiosResponse<JWT> = await api.post(PATHS.USER_TOKEN_REFRESH, {...requestData})
        return res.data;
    }


}