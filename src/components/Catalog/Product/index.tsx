import React, {FC} from 'react';
import styles from "./product.module.scss";
import {getImgPath} from "../../../utils/getAssetsPath";
import RedButton from "../../Buttons/RedButton";
import {MinusIcon, PlusIcon} from "../../../icons";
import {HasClassName} from "../../../types/components.types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    handleLogin,
    handleProductAdditives,
    handleYourAddress,
    setProductAdditivesData
} from "../../../features/modals/modalsSlice";
import {ProductRes, Supplement} from "../../../types/api.types";
import {addToCart, editCountCart} from "../../../features/cart/cartSlice";
import useAuth from "../../../hooks/useAuth";
import useToken from "../../../hooks/useToken";
import {domen} from "../../../http/instance/instances";

type ProductProps = {
    id: number,
    inCart?: boolean,
    count?: number,
    supplements?: Array<Supplement>
} & ProductRes


const Product: FC<ProductProps & HasClassName> = ({
                                                      title,
                                                      supplements = [],
                                                      image,
                                                      id,
                                                      count = 0,
                                                      inCart = false,
                                                      className,
                                                      composition,
                                                      weight,
                                                      price
                                                  }) => {
    const dispatch = useAppDispatch()

    // const [count, setCount] = useState<number>(count1)
    // const [isInCart, setInCart] = useState<boolean>(inCart)
    // const addCount = () => setCount(prev => prev + 1)
    // const reduceCount = () => setCount(prev => {
    //     if(prev > 1) {
    //         return prev - 1
    //     }
    //     return prev
    // })
    const token = useToken()
    const {address} = useAppSelector(state => state.forms.orderForm)
    const cart = useAppSelector(state => state.cart.items)
    const handleAddToCart = () => {
        if (supplements.length) {
            dispatch(setProductAdditivesData({
                id: id,
                additives: supplements,
                currentAdditive: 0,
                description: composition,
                imageUrl: domen + "/" + image || "",
                name: title,
                price: price,
                weight: weight

            }))
            dispatch(handleProductAdditives())
            return;
        }
        if (token) {
            if(address.val.length > 0) {
                dispatch(addToCart({
                    category: 1,
                    composition,
                    description: composition,
                    id,
                    image,
                    price,
                    short_description: "",
                    supplements,
                    title: title,
                    weight

                }))
                return;
            }
            dispatch(handleYourAddress())

            return;
        }
        dispatch(handleLogin())
    }

    return (
        <div className={`${styles.product} h-100p f-column-betw gap-15`}>
            <div className="f-column gap-15">
                <div style={{backgroundImage: `url("${domen}/${image}")`}}
                     className={`${styles.img} w-100p`}>

                </div>
                <div className="textBlock f-column gap-5">
                    <h3>{title}</h3>
                    <div className="f-1 d-f jc-between gap-25">
                        <p>{composition}</p>


                        <div className={`${styles.weight} txt-right`}>{weight} г</div>
                    </div>
                </div>


            </div>
            <div style={{minHeight: 37}} className="f-row-betw">
                <h4>{price} ₽</h4>
                {
                    inCart ?
                        <div className={"d-f al-center gap-5"}>
                            <div onClick={() => {
                                if(count > 1) {
                                    dispatch(editCountCart({
                                        cart_id: cart.filter(item => item.product.id === id)[0].id,
                                        count: count - 1,
                                        id: id

                                    }))
                                }

                            }} className={"cur-pointer f-c-col"}><MinusIcon/></div>

                            <div className={styles.count}>{count}</div>
                            <div onClick={() => {
                                dispatch(editCountCart({
                                    cart_id: cart.filter(item => item.product.id === id)[0].id,
                                    count: count + 1,
                                    id: id

                                }))
                            }} className={"cur-pointer f-c-col"}><PlusIcon/></div>

                        </div>
                        :

                        <RedButton onClick={handleAddToCart} className={`${styles.btn} `}>
                            В корзину
                        </RedButton>
                }

            </div>

        </div>
    );
};

export default Product;