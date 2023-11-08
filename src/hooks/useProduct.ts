import {arraysEqual} from "../utils/arrayEquals";
import {handleLogin, handleProductAdditives, handleYourAddress} from "../features/modals/modalsSlice";
import {CartCountSupplementsRequest} from "../types/api.types";
import {addToCart, editSupplementsCountCart, setProductAfterAddress} from "../features/cart/cartSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import useToken from "./useToken";
import useCartAdd from "./useCartAdd";

const UseProduct = (product_id: number, addedSupplements: number[]) => {
    const dispatch = useAppDispatch()
    const token = useToken()
    const handleAddedPopup = useCartAdd()

    const {address, restaurant} = useAppSelector(state => state.forms.orderForm)
    const {items} = useAppSelector(state => state.products)
    const cart = useAppSelector(state => state.cart.items)

    const thisProduct = items.filter(prodItem => prodItem.id === product_id)[0]

    const saveChangesAdditives = () => {
        const cartProduct = cart.filter(item => item.product.id === product_id)[0]
        const cart_id = cartProduct.id

        const supplementsThisCartProd = cartProduct?.supplements

        const supplementsIdsCartProd = supplementsThisCartProd?.map(item => {
            return item.id
        })
        const supplementsIdsProduct = thisProduct.supplements?.map(item => {
            return item.id
        })

        const addedEqualsCart = arraysEqual(supplementsIdsCartProd, addedSupplements)

        if (addedEqualsCart) {
            dispatch(handleProductAdditives())
            return;
        }

        const changedData: CartCountSupplementsRequest = {
            supplements: supplementsIdsProduct.map(item => {
                const cartId = cart_id !== undefined ? cart_id : -1
                const addedIncludesId = addedSupplements.includes(item)
                return {
                    cart_id: cartId,
                    supplements_id: item,
                    added: addedIncludesId
                }
            })

        }

        dispatch(editSupplementsCountCart(changedData))
        dispatch(handleProductAdditives())
    }

    const getAddedSupplements = () => {
        return thisProduct.supplements.filter(item => {
            if (addedSupplements.includes(item.id)) {
                return item
            }
        })
    }

    const handleAddToCartClick = () => {
        dispatch(handleProductAdditives())
        if (token) {
            const deliveryIsDefined = address.val.length > 0 || restaurant !== -1
            if (deliveryIsDefined) {
                const product = items.filter(item => item.id === product_id)[0]
                dispatch(addToCart({
                    ...product,
                    supplements: getAddedSupplements()
                }))
                handleAddedPopup(thisProduct.title, thisProduct.weight)
                return;
            }
            dispatch(setProductAfterAddress(product_id))
            dispatch(handleYourAddress())
            return
        }
        dispatch(handleLogin())

    }
    return [
        handleAddToCartClick,
        saveChangesAdditives,
        getAddedSupplements
    ]
};

export default UseProduct;