import {Supplement} from "./api.types";

export type Product = {
    price: number
    imageUrl: string,
    name: string,
    description: string,
    weight: number
}

export type AdditiveProduct = Pick<Product, "name" | "imageUrl" |"price">

export type ProductAdditiveData = {
    id: number
    currentAdditive: number
    additives: Array<Supplement>
} & Product