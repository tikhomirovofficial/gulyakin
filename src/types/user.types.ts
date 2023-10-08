
export type Address = {
    city: string
    street: string
}

export type UserData = {
    name: string,
    phone: string
    birthday: string
    email: string
    addresses: Array<Address>
}