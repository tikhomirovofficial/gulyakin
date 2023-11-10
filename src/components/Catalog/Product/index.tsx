import React, {FC} from 'react';
import styles from "./product.module.scss";
import RedButton from "../../Buttons/RedButton";
import {MinusIcon, PlusIcon} from "../../../icons";
import {HasClassName} from "../../../types/components.types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    handleLogin,
    handleProductAdditives,
    handleYourAddress,
    setChangingAdditivesMode,
    setProductAdditivesData
} from "../../../features/modals/modalsSlice";
import {ProductRes, Supplement} from "../../../types/api.types";
import {editCountCart, setProductAfterAddress, setProductAfterLogin} from "../../../features/cart/cartSlice";
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
    const {isMobile} = useAppSelector(state => state.main)
    const cart = useAppSelector(state => state.cart.items)
    const handleSetAdditivesData = () => {
        dispatch(setProductAdditivesData({
            id: id,
            additives: supplements,
            currentAdditive: 0,
            description: composition,
            imageUrl: image || "",
            is_combo: false,
            name: title,
            price: price,
            weight: weight

        }))
        dispatch(handleProductAdditives())
    }
    const handleOpenAdditives = () => {
        const addedToCart = cart.some(item => item.product.id === id)
        if (addedToCart) {
            const hasSupplements = supplements.length > 0
            if (hasSupplements) {
                dispatch(setChangingAdditivesMode(true))
            }
            handleSetAdditivesData()
            return;
        }
        handleSetAdditivesData()
        return;
    }

    const handlePlusProduct = () => {
        dispatch(editCountCart({
            cart_id: cart.filter(item => item.product.id === id)[0].id,
            count: count + 1,
            id: id
        }))
    }
    const handleMinusProduct = () => {
        if (count > 1) {
            dispatch(editCountCart({
                cart_id: cart.filter(item => item.product.id === id)[0].id,
                count: count - 1,
                id: id
            }))
        }
    }

    return (
        <div onClick={handleOpenAdditives} className={`${styles.product} cur-pointer h-100p f-column-betw gap-15`}>
            <div className="f-column ">
                <div className={`${styles.img} w-100p`}>
                    <img src={domain + "/" + image} alt=""/>
                </div>
            </div>
            <div className={`${styles.content} f-column-betw gap-20 f-1`}>
                <div className={`${styles.textBlock} gap-5 f-1 f-column-betw`}>
                    <h3>{title}</h3>
                    <div className="d-f jc-between gap-25">
                        <p>{composition}</p>
                        {isMobile ? null :
                            <div className={`${styles.weight} txt-right`}>{weight} г</div>
                        }

                    </div>
                </div>
                <div onClick={e => e.stopPropagation()} style={{minHeight: 37}} className="f-row-betw">
                    {isMobile ? null :
                        <div className={"d-f al-center gap-10"}>
                            {sale ?
                                <div className={`${styles.sale} p-rel`}>
                                    <div className={`${styles.line} p-abs`}></div>
                                    <b>{price}</b>
                                </div> : null
                            }

                            <h4>{sale || price} ₽</h4>
                        </div>
                    }


                    {
                        inCart ?
                            <div className={"d-f al-center gap-5"}>
                                <div onClick={handleMinusProduct} className={"cur-pointer f-c-col pd-10-0"}><MinusIcon/>
                                </div>
                                <div className={styles.count}>{count}</div>
                                <div onClick={handlePlusProduct} className={"cur-pointer f-c-col"}><PlusIcon/></div>

                            </div>
                            :
                            <RedButton onClick={handleOpenAdditives} className={`${styles.btn} `}>
                                {!isMobile ? " В корзину" : `${sale || price} ₽`}

                            </RedButton>
                    }
                    {!isMobile ? null :
                        <div className={`${styles.weight} txt-right`}>{weight} г</div>
                    }


                </div>
            </div>


        </div>
    );
};

export default Product;