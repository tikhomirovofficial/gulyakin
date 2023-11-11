import {
    AddressAddResponse,
    AddToCartRequest,
    CartCountSupplementsRequest,
    CartCountSupplementsResponse,
    CartProductDeleteRequest,
    CartProductDeleteResponse,
    ChangeCountCartRequest,
    ChangeCountCartResponse,
    CreateOrderRequest,
    CreateOrderResponse,
    GetCartResponse,
    GetDeliveryListResponse, GetHistoryOrdersResponse,
    GetOrderRequest, GetOrderResponse,
    GetPaymentListResponse,
    SendPaymentRequest,
    SendPaymentResponse
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import authApi, {api} from "../instance/instances";
import {PATHS} from "./path.api";
import {ConvertDataToGetParams} from "../../utils/ConvertDataToGetParams";

export class OrderApi {
    static async DeliveriesWays(): Promise<AxiosResponse<GetDeliveryListResponse>> {
        const res: AxiosResponse<GetDeliveryListResponse> = await api.get(PATHS.DELIVERY_OPTIONS);
        return res;
    }
    static async PaymentsWays(): Promise<AxiosResponse<GetPaymentListResponse>> {
        const res: AxiosResponse<GetPaymentListResponse> = await api.get(PATHS.PAYMENT_OPTIONS);
        return res;
    }
    static async GetData(request: GetOrderRequest): Promise<AxiosResponse<GetOrderResponse>> {
        const res: AxiosResponse<GetOrderResponse> = await api.get(PATHS.GET_ORDER + ConvertDataToGetParams(request));
        return res;
    }
    static async GetHistory(): Promise<AxiosResponse<GetHistoryOrdersResponse>> {
        const res: AxiosResponse<GetHistoryOrdersResponse> = await api.get(PATHS.ORDER_HISTORY);
        return res;
    }
    static async Create(requestData: CreateOrderRequest): Promise<AxiosResponse<CreateOrderResponse>> {
        const res: AxiosResponse<CreateOrderResponse> = await authApi.post(PATHS.CREATE_ORDER, {...requestData});
        if(!res.data) {
            throw res
        }
        return res;
    }
    static async PaymentConfirmation(requestData: SendPaymentRequest): Promise<AxiosResponse<SendPaymentResponse>> {
        const res: AxiosResponse<SendPaymentResponse> = await api.post(PATHS.PAYMENT_CONFIRMATION, {...requestData});
        return res;
    }

}