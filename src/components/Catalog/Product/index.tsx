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
    handleYourAddress, setChangingAdditivesMode,
    setProductAdditivesData
} from "../../../features/modals/modalsSlice";
import {ProductRes, Supplement} from "../../../types/api.types";
import {addToCart, editCountCart, setProductAfterAddress, setProductAfterLogin} from "../../../features/cart/cartSlice";
import useAuth from "../../../hooks/useAuth";
import useToken from "../../../hooks/useToken";
import {domain} from "../../../http/instance/instances";

type ProductProps = {
    id: number,
    inCart?: boolean,
    count?: number,
    sale?: number
    supplements?: Array<Supplement>
} & ProductRes


const Product: FC<ProductProps & HasClassName> = ({
                                                      title,
                                                      supplements = [],
                                                      image,
                                                      id,
                                                      count = 0,
                                                      inCart = false,
    sale,
                                                      className,
                                                      composition,
                                                      weight,
                                                      price
                                                  }) => {
    const dispatch = useAppDispatch()

    const token = useToken()
    const {address, restaurant} = useAppSelector(state => state.forms.orderForm)
    const cart = useAppSelector(state => state.cart.items)
    const handleOpenAdditives = () => {
        const addedToCart = cart.some(item=> item.product.id === id)
        if(addedToCart) {
            if(supplements.length > 0) {
                dispatch(setChangingAdditivesMode(true))
                dispatch(setProductAdditivesData({
                    id: id,
                    additives: supplements,
                    currentAdditive: 0,
                    description: composition,
                    imageUrl:  image || "",
                    name: title,
                    price: price,
                    weight: weight

                }))
                dispatch(handleProductAdditives())
            }
            return;
        }
        dispatch(setProductAdditivesData({
            id: id,
            additives: supplements,
            currentAdditive: 0,
            description: composition,
            imageUrl:  image || "",
            name: title,
            price: price,
            weight: weight

        }))
        dispatch(handleProductAdditives())


        return;
    }
    const handleAddToCart = () => {


        if (token) {
            if(address.val.length > 0 || restaurant !== -1) {
                handleOpenAdditives()
                // dispatch(addToCart({
                //     category: 1,
                //     composition,
                //     description: composition,
                //     id,
                //     image,
                //     price,
                //     short_description: "",
                //     supplements,
                //     title: title,
                //     weight
                //
                // }))
            } else {
                dispatch(setProductAfterAddress(id))
                dispatch(handleYourAddress())
            }
            return;
        }
        dispatch(setProductAfterLogin(id))
        dispatch(handleLogin())
    }

    return (
        <div onClick={handleOpenAdditives} className={`${styles.product} cur-pointer h-100p f-column-betw gap-15`}>
            <div className="f-column gap-15">
                <div className={`${styles.img} w-100p`}>
                    <img src={domain + "/" + image} alt=""/>
                </div>


                <div className="textBlock f-column gap-5">
                    <h3>{title}</h3>
                    <div className="f-1 d-f jc-between gap-25">
                        <p>{composition}</p>


                        <div className={`${styles.weight} txt-right`}>{weight} г</div>
                    </div>
                </div>


            </div>
            <div onClick={e => e.stopPropagation()} style={{minHeight: 37}} className="f-row-betw">
                <div className={"d-f al-center gap-10"}>
                    {sale ?
                        <div className={`${styles.sale} p-rel`}>
                            <div className={`${styles.line} p-abs`}></div>
                            <b>{price}</b>
                        </div> : null
                    }

                    <h4>{sale || price} ₽</h4>
                </div>

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

                            }} className={"cur-pointer f-c-col pd-10-0"}><MinusIcon/></div>

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