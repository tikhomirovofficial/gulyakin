import {UserData} from "./user.types";
import {ResponseStatus} from "./common.types";

export type JWT = {
    access?: string,
    refresh?: string
}

interface Supplement {
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
export type LoginResponse = JWT

export type RefreshRequest = Pick<JWT, "refresh">
export type RefreshResponse = Pick<JWT, "access">

export type ChangeUserRequest = Omit<UserData, "phone">
export type ChangeUserResponse = ResponseStatus

export type AddressAddRequest = {
    address: string
}
export type AddressAddResponse = ResponseStatus

export type UserAddressesResponse = ResponseStatus & {
    id: number,
    address: string
}
export type DeleteUserAddressRequest = {
    address_id: 1
}
export type DeleteUserAddressResponse = ResponseStatus

export type GetUserDataResponse = ResponseStatus & {
    user: UserData
}

export type GetCityAddressesRequest = {
    city_id: number
}
export type GetCityAddResponse = ResponseStatus & {
    address: Array<{
        address_id: number,
        city: string,
        address: string,
        long: number,
        lat: number
    }>
}

export type GetByMarketAddressesRequest = {
    city_id: number
    market_id: number
}

export type GetProductsByMarketRequest = {
    market_id: number
}
export type GetProductsByMarketResponse = {
    products: ProductRes[];
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


export type GetCombosByMarketResponse = {
    combos: Combo[]
} & ResponseStatus

export type AddToCartItem = {
    product: number,
    supplements: Array<{
        id: number,
        count: number
    }>
}
export type AddToCartRequest = {
    products: AddToCartItem[]
}
export type AddToCartItemResponse = ResponseStatus

export type GetCartResponse = {
    cart: Array<{
        id: number,
        product: Array<{
            id: number
            title: string,
            short_description: string
            image: string
            price: number
        }>
        count: number
        supplements: Array<Supplement>

    }>
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


