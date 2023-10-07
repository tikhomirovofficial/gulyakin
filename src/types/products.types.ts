export type Product = {
    price: number
    imageUrl: string,
    name: string,
    description: string,
    weight: number
}

export type AdditiveProduct = Pick<Product, "name" | "imageUrl" |"price">

export type ProductAdditiveData = {
    currentAdditive: number
    additives: Array<AdditiveProduct>
} & Product