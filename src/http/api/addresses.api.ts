import {
    BookingCreateRequest, BookingCreateResponse,
    GetAddressesByMarketCityRequest, GetAddressesByMarketCityResponse,
    GetAddressInfoRequest,
    GetAddressInfoResponse, GetBookingsRequest, GetBookingsResponse,
    GetByCityAddressesRequest, GetByCityAddressesResponse,
    GetCitiesResponse
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {api} from "../instance/instances";
import {PATHS} from "./path.api";
import {ConvertDataToGetParams} from "../../utils/ConvertDataToGetParams";

export class AddressesApi {
    static async AddressInfoById(requestData: GetAddressInfoRequest): Promise<AxiosResponse<GetAddressInfoResponse>> {
        const res: AxiosResponse<GetAddressInfoResponse> = await api.get(PATHS.MARKET_ADDRESS_INFO + ConvertDataToGetParams(requestData));
        return res;
    }
    static async Cities(): Promise<AxiosResponse<GetCitiesResponse>> {
        const res: AxiosResponse<GetCitiesResponse> = await api.get(PATHS.MARKET_CITIES);
        return res;
    }
    static async AddressInfoByCityId(requestData: GetByCityAddressesRequest): Promise<AxiosResponse<GetByCityAddressesResponse>> {
        const res: AxiosResponse<GetByCityAddressesResponse> = await api.get(PATHS.MARKET_ADDRESSES_BY_CITY + ConvertDataToGetParams(requestData));
        return res;
    }
    static async AddressInfoByCityAndMarketId(requestData: GetAddressesByMarketCityRequest): Promise<AxiosResponse<GetAddressesByMarketCityResponse>> {
        const res: AxiosResponse<GetAddressesByMarketCityResponse> = await api.get(PATHS.MARKET_ADDRESSES_BY_CITY + ConvertDataToGetParams(requestData));
        return res;
    }

    static async Bookings(requestData: GetBookingsRequest): Promise<AxiosResponse<GetBookingsResponse>> {
        const res: AxiosResponse<GetBookingsResponse> = await api.get(PATHS.BOOKINGS_LIST + ConvertDataToGetParams(requestData));
        return res;
    }
    static async CreateBooking(requestData: BookingCreateRequest): Promise<AxiosResponse<BookingCreateResponse>> {
        const res: AxiosResponse<BookingCreateResponse> = await api.post(PATHS.BOOKINGS_LIST, requestData);
        return res;
    }

}