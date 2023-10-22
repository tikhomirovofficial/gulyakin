import {
    AddressAddResponse,
    AddToCartRequest,
    CartCountSupplementsRequest,
    CartCountSupplementsResponse,
    CartProductDeleteRequest,
    CartProductDeleteResponse,
    ChangeCountCartRequest,
    ChangeCountCartResponse,
    GetCartResponse
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {api} from "../instance/instances";
import {PATHS} from "./path.api";

export class CartApi {
    static async AddProduct(requestData: AddToCartRequest): Promise<AxiosResponse<AddressAddResponse>> {
        const res: AxiosResponse<AddressAddResponse> = await api.post(PATHS.ADD_TO_CART, {...requestData});
        return res;
    }

    static async GetProducts(): Promise<AxiosResponse<GetCartResponse>> {
        const res: AxiosResponse<GetCartResponse> = await api.get(PATHS.VIEW_CART);
        return res;
    }
    static async EditProductCount(requestData: ChangeCountCartRequest): Promise<AxiosResponse<ChangeCountCartResponse>> {
        const res: AxiosResponse<ChangeCountCartResponse> = await api.post(PATHS.EDIT_CART_ITEM, {...requestData});
        return res;
    }
    static async EditSupplementsCount(requestData: CartCountSupplementsRequest): Promise<AxiosResponse<CartCountSupplementsResponse>> {
        const res: AxiosResponse<CartCountSupplementsResponse> = await api.post(PATHS.EDIT_CART_SUPPLEMENTS, {...requestData});
        return res;
    }
    static async RemoveProduct(requestData: CartProductDeleteRequest): Promise<AxiosResponse<CartProductDeleteResponse>> {
        const res: AxiosResponse<CartProductDeleteResponse> = await api.post(PATHS.DELETE_CART_ITEM, {...requestData});
        return res;
    }
}