import {UserData} from "./user.types";
import {ResponseStatus} from "./common.types";

export type JWT = {
    access?: string,
    refresh?: string
}

export interface Supplement {
    id: number;
    title: string;
    short_description: string;
    image: string;
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
type Combo = {
    old_price: number
    new_price: number
    products: Array<Pick<ProductRes, "id" | "title">>
} & Pick<ProductRes, "title" | "image" | "id">
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

export type AddressAddRequest = {
    address: string
}
export type AddressAddResponse = ResponseStatus

export type UserAddressesResponse = ResponseStatus & {
   adress: Array<{
       id: number,
       address: string
   }>
}
export type DeleteUserAddressRequest = {
    address_id: 1
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
    adress_id: 1
}
export type GetAddressInfoResponse = {
    data: {
        id: number;
        adress: string;
        market: {
            id: number;
            name: string;
            short_description: string;
            description: string;
            link: string;
        };
        long: number;
        lat: number;
        work_with: string;
        works_until: string;
        timeaone: string;
        image: string[];
    }
} & ResponseStatus

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
export type AddToCartRequest = {
    products: AddToCartItem[]
}
export type AddToCartResponse = {
    id: number
    list_id: number[]

} & ResponseStatus

export type CartProductItem = {
    id: number,
    product: {
        id: number
        title: string,
        short_description: string
        image: string
        price: number
        composition: string
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
    supplements: Array<{
        cart_id: number,
        supplements_id: number
        count: number
    }>
    cart_id: number,
    count: number
}
export type CartCountSupplementsResponse = ResponseStatus


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
