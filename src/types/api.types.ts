import {UserData} from "./user.types";
import {ResponseStatus} from "./common.types";
import {RestaurantDetails} from "./restaurants.types";

export type JWT = {
    access?: string,
    refresh?: string
}

export interface Supplement {
    id: number;
    title: string;
    short_description: string;
    image: string;
    supplement_in_cart_id?: number,
    price: number;
}

export type ProductRes = {
    id: number;
    title: string;
    short_description: string;
    description: string;
    price: number;
    image: string;
    category: number;
    weight: number;
    supplements: Supplement[];
    composition: string;
}
export type AdditiveItem = {
    id: number,
    title: string,
    image: string
}
export type ComboFields = {
    old_price?: number
    price: number,
    weight: number,
    products?: Array<AdditiveItem>
    drinks?: Array<AdditiveItem>
}
export type Combo = ComboFields & Pick<ProductRes, "title" | "image" | "id">

export type Category = {
    id: number;
    title: string;
    image: string;
};


export type RegistrationRequest = Pick<UserData, "phone">
export type RegistrationResponse = ResponseStatus

export type LoginRequest = {
    username: string,
    password: string
}
export type LoginResponse = JWT & {
    detail?: string
}

export type RefreshRequest = Pick<JWT, "refresh">
export type RefreshResponse = Pick<JWT, "access">

export type ChangeUserRequest = Omit<UserData, "phone">
export type ChangeUserResponse = {user: UserData} & ResponseStatus

export type AddressApiItem ={
    id: number
    adress: string,
    entrance: number,
    floor: number,
    door_code: number
    apartment: number
}
export type AddressAddRequest = Omit<AddressApiItem, "id">
export type AddressAddResponse = ResponseStatus & Pick<AddressApiItem, "id">

export type UserAddressesResponse = ResponseStatus & {
   adress: Array<AddressApiItem>
}
export type DeleteUserAddressRequest = {
    adress_id: number
}
export type DeleteUserAddressResponse = ResponseStatus

export type GetUserDataResponse = ResponseStatus & {
    user: UserData
}

export type GetByCityAddressesRequest = {
    siti_id: number
}

export type GetByCityAddressesResponse = ResponseStatus & {
    address: Array<{
        address_id: number,
        siti: string,
        address: string,
        long: number,
        lat: number
    }>
}

export type GetAddressInfoRequest = {
    adress_id: number
}
export type GetAddressInfoResponse = {
    data: RestaurantDetails
}

export type GetCitiesResponse = {
    siti: Array<{
        id: number,
        name: string
    }>
} & ResponseStatus

export type GetAddressesByMarketCityRequest = {
    siti_id: number
    market_id: number
}
export type AddressByMarketCity = {
    id: number,
    adress: string,
    market: string,
    long: number,
    lat: number,
    work_with: string,
    works_until: string
}
export type GetAddressesByMarketCityResponse = {
   adress: Array<AddressByMarketCity>
} & ResponseStatus

export type GetProductsByMarketRequest = {
    market_id: number
}
export type GetProductsByMarketResponse = {
    products: ProductRes[];
} & ResponseStatus

export type GetSousesRequest = {

}
export type GetSousesResponse = {

} & ResponseStatus


export type GetMarketInfoRequest = {
    market_id: number
}

export type GetMarketInfoResponse = {
    shop: {
        id: number,
        name: string,
        short_description: string,
        description: string,
        link: string
    }
} & ResponseStatus

export type GetCategoriesByMarketRequest = {
    market_id: number
}
export type GetCategoriesByMarketResponse = {
    category: Category[];
} & ResponseStatus


export type GetCombosByMarketRequest = {
    market_id: number
}

export type GetProductDayByMarketRequest = {
    market_id: number,
    date: string
}
export type GetProductDayByMarketResponse = {
    product: ProductRes
} & ResponseStatus

export type GetCombosByMarketResponse = {
    combos: Combo[]
} & ResponseStatus

export type AddToCartItem = {
    product: number,
    supplements?: Array<{
        id: number,
        count: number
    }>
    count: number
}
export type AddToCartCombo = {
    id: number,
    selected_product: number,
    count: number
}
export type AddToCartComboRequest = {
    combo: AddToCartCombo[]
    combo_prod: Combo
}
export type AddToCartComboResponse = AddToCartResponse
export type EditCartComboRequest = {
    combos: AddToCartCombo[]
    combo_id: number
}
export type EditCartComboResponse = {
    combo: CartProductItem[]
} & ResponseStatus

export type AddToCartRequest = {
    products: AddToCartItem[]
}
export type AddToCartResponse = {
    id: number
    list_id: number[]

} & ResponseStatus


export type CartProductItem = {
    is_combo: boolean,
    id: number,
    product: {
        id: number
        title: string,
        short_description: string
        image: string
        price: number
        composition: string
        products?: AdditiveItem[]
        drinks?: AdditiveItem[]
        selected_product?: {
            id: number,
            title: string
        }
    }
    count: number
    supplements: Array<Supplement>
}
export type GetCartResponse = {
    cart: Array<CartProductItem>
    price: number,
    supplement_counts: Record<string, number>
} & ResponseStatus

export type ChangeCountCartRequest = {
    cart_id: number,
    count: number
}
export type ChangeCountCartResponse = ResponseStatus

export type CartCountSupplementsRequest = {
    cart_id: number,
    supplements: Array<{
        supplements_id: number,
        supplement_in_cart_id: number,
        added: boolean
    }>
}
export type CartCountSupplementsResponse = {
    supplements_list: Array<Supplement>
} & ResponseStatus


export type CartProductDeleteRequest = {
    cart_id: number,
}
export type CartProductDeleteResponse = ResponseStatus

export type GetDeliveryListResponse = {
    delivery_list: Array<{
        id: number,
        title: string
    }>
} & ResponseStatus

export type GetPaymentListResponse = {
    payment_list: Array<{
        id: number,
        title: string
    }>
} & ResponseStatus

//Если тип доставки самовывоз, то передайте marekt_adress_id, а user_adress_id можете не передавать
export type CreateOrderRequest = {
    user_adress_id?: number,
    marekt_adress_id?: number,
    is_call: boolean,
    time_delivery: string,
    delivery_type: number,
    pyment_type: number
}

export type CreateOrderResponse = {
    order_id: number,
    payment_url: string
} & ResponseStatus

export type SendPaymentRequest = {
    order_id: number
}
export type SendPaymentResponse = ResponseStatus


export type GetOrderRequest = {
    order_id: number
}

export type GetOrderResponse = {
    order: {
        order_id: number,
        datetime: string,
        price: number,
        is_payment: false,
        is_active: true,
        products: string[]
        address: string
    }
} & ResponseStatus


export type GetHistoryOrdersResponse = {
    order: Omit<GetOrderResponse, "status">
} & ResponseStatus
