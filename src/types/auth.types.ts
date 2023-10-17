import {UserData} from "./user.types";
import {ResponseStatus} from "./common.types";

export type JWT = {
    access?: string,
    refresh?: string
}


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



