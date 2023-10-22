import {
    GetAddressInfoRequest,
    GetAddressInfoResponse,
    GetMarketInfoRequest,
    GetMarketInfoResponse
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {api} from "../instance/instances";
import {PATHS} from "./path.api";
import {ConvertDataToGetParams} from "../../utils/ConvertDataToGetParams";

export class MarketApi {
    static async InfoById(requestData: GetMarketInfoRequest): Promise<AxiosResponse<GetMarketInfoResponse>> {
        const res: AxiosResponse<GetMarketInfoResponse> = await api.get(PATHS.MARKET_INFO + ConvertDataToGetParams(requestData));
        return res;
    }


}