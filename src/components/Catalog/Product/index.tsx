import React, {FC} from 'react';
import styles from "./product.module.scss";
import RedButton from "../../Buttons/RedButton";
import {MinusIcon, PlusIcon, StarsIcon} from "../../../icons";
import {HasClassName} from "../../../types/components.types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    handleProductAdditives,
    setChangingAdditivesMode,
    setProductAdditivesData
} from "../../../features/modals/modalsSlice";
import {ProductRes, Supplement} from "../../../types/api.types";
import {editCountCart} from "../../../features/cart/cartSlice";
import {domain} from "../../../http/instance/instances";
import useTheme from '../../../hooks/useTheme';

type ProductProps = {
    id: number,
    inCart?: boolean,
    count?: number,
    sale?: number,
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
    dimensions,
                                                      className,
                                                      composition,
    is_product_day,
    is_product_week,
    is_multiple_supplements,
                                                      weight,
                                                      price
                                                  }) => {
    const dispatch = useAppDispatch()
    const {isMobile} = useAppSelector(state => state.main)
    const cart = useAppSelector(state => state.cart.items)
    const gTheme = useTheme()
    const handleSetAdditivesData = () => {
        dispatch(setProductAdditivesData({
            id: id,
            additives: supplements,
            currentAdditive: 0,
            description: composition,
            imageUrl: image || "",
            is_combo: false,
            name: title,
            is_multiple_supplements: is_multiple_supplements,
            price: price,
            weight: weight,
            dimensions

        }))
        dispatch(handleProductAdditives())
    }
    const handleOpenAdditives = () => {
        const addedToCart = cart.some(item => item.product.id === id && !item.is_combo)
        if (addedToCart) {
            const hasSupplements = supplements.length > 0
            if (hasSupplements) {
                dispatch(setChangingAdditivesMode(true))
                handleSetAdditivesData()
            }
            return;
        }
        handleSetAdditivesData()
        return;
    }

    const handlePlusProduct = () => {
        dispatch(editCountCart({
            cart_id: cart.filter(item => item.product.id === id && !item.is_combo)[0].id,
            count: count + 1,
            id: id
        }))
    }
    const handleMinusProduct = () => {
        if (count > 1) {
            dispatch(editCountCart({
                cart_id: cart.filter(item => item.product.id === id && !item.is_combo)[0].id,
                count: count - 1,
                id: id
            }))
        }
    }

    return (
        <div onClick={handleOpenAdditives} className={`${styles.product} cur-pointer h-100p f-column-betw gap-15`}>
            <div className="f-column ">
                <div className={`${styles.img} w-100p`}>
                    <img src={domain + "/" + image}/>
                    {
                        is_product_day ? <div className={`d-f al-center gap-5 ${gTheme("lt-active-bg", "dk-active-bg")} ${styles.productLabel}`}>
                            <StarsIcon/>
                            <b>Товар дня</b>
                        </div> : is_product_week ?
                            <div className={`d-f al-center gap-5 ${styles.productLabel}`}>
                                <StarsIcon/>
                                <b className={gTheme("lt-active-bg", "dk-active-bg")}>Товар недели</b>
                            </div> : null
                    }
                </div>
            </div>
            <div className={`${styles.content} f-column-betw gap-20 f-1`}>
                <div className={`${styles.textBlock} gap-5 f-1 f-column-betw`}>
                    <h3 className={gTheme("lt-dark-coal-c", "dk-gray-c")}>{title}</h3>
                    <div className="d-f jc-between gap-25 f-1">
                        <p className={gTheme("lt-c", "dk-c")}>{composition}</p>
                        {isMobile ? null :
                            <div className={`${styles.weight} txt-right ${gTheme("lt-c", "dk-c")}`}>{weight} {dimensions}</div>
                        }
                    </div>
                </div>
                <div onClick={e => e.stopPropagation()} style={{minHeight: 37}} className="f-row-betw">
                    {isMobile ? null :
                        <div className={"d-f al-center gap-10"}>
                            {sale ?
                                <div className={`${styles.sale} p-rel`}>
                                    <div className={`${styles.line} p-abs`}></div>
                                    <b className={gTheme("lt-light-black-c", "dk-gray-c")}>{price}</b>
                                </div> : null
                            }

                            <h4 className={gTheme("lt-light-black-c", "dk-gray-c")}>{sale || price} ₽</h4>
                        </div>
                    }


                    {
                        inCart ?
                            <div className={"d-f al-center gap-5"}>
                                <div onClick={handleMinusProduct} className={"cur-pointer f-c-col pd-10-0"}><MinusIcon fill={"#F6CAAF"}/>
                                </div>
                                <div className={`${styles.count} grayColor_dark`}>{count}</div>
                                <div onClick={handlePlusProduct} className={"cur-pointer f-c-col"}><PlusIcon fill={"#F6CAAF"}/></div>

                            </div>
                            :
                            <RedButton onClick={handleOpenAdditives} className={`${styles.btn} `}>
                                {!isMobile ? " В корзину" : `${sale || price} ₽`}
                            </RedButton>
                    }
                    {!isMobile ? null :
                        <div className={`${styles.weight} txt-right colorWhite_dark`}>{weight} {dimensions}</div>
                    }


                </div>
            </div>


        </div>
    );
};

export default Product;