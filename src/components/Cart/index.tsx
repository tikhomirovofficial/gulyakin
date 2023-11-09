import React, {useEffect, useMemo, useState} from 'react';
import ShadowWrapper from "../Windows/ShadowWrapper";
import {CloseIcon, InfoCircle} from "../../icons";
import styles from './cart.module.scss'
import RedButton from "../Buttons/RedButton";
import {getImgPath} from "../../utils/getAssetsPath";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {formatNumberWithSpaces} from "../../utils/numberWithSpaces";
import {handleCartOpened} from "../../features/modals/modalsSlice";
import {useNavigate} from "react-router-dom";
import CartAdditiveItem from "./CartAdditiveItem";
import CartList from "./CartList";


const Cart = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {items, totalPrice} = useAppSelector(state => state.cart)
    const [additivesOpened, setAdditivesOpened] = useState(false)
    const [classAdditivesAdded, setClassAdditivesAdded] = useState(false)
    const [classOpened, setClassOpened] = useState(false)

    const handleOpenAdditives = () => {
        setAdditivesOpened(true)

        setTimeout(() => {
            setClassAdditivesAdded(true)
        }, 200)
    }
    const handleCloseAdditives = () => {
        setClassAdditivesAdded(false)
        setTimeout(() => {
            setAdditivesOpened(false)
        }, 300)
    }

    const handleCloseCart = () => {
        setClassOpened(false)
        setTimeout(() => {
            dispatch(handleCartOpened())
        }, 300)
    }


    const totalCount = useMemo(() => {
        return items.reduce((prev, cur) => {
            return prev + cur.count
        }, 0)
    }, [items])


    const handleToOrder = () => {
        handleCloseCart()
        navigate("/order")
    }

    const handleToCatalog = () => {
        handleCloseCart()
        navigate("/")
    }

    useEffect(() => {
        setTimeout(() => {
            setClassOpened(true)
        }, 200)
    }, [])

    return (
        <ShadowWrapper onClick={handleCloseCart} className={"d-f jc-end p-fix h-100v w-100v"}>

            <div onClick={e => e.stopPropagation()}
                 className={`${styles.cartBlock} ${classOpened ? styles.cartBlockOpened : ""} bg-white f-column p-rel`}>
                {
                    additivesOpened ?
                        <div
                            className={`${classAdditivesAdded ? styles.additivesWindowOpened : ""} top-0 p-abs h-100v w-100p`}>
                            <ShadowWrapper onClick={handleCloseAdditives}
                                           className={`${styles.additivesWindowShadow} d-f al-end h-100p w-100p p-abs top-0 t-opacity-visible-transform-3`}>
                            </ShadowWrapper>
                            <div
                                className={`${styles.cartAdditivesBar} bg-white p-abs left-0 w-100p pd-30 f-column gap-15`}>
                                <h3>Соусы для ваших блюд</h3>
                                <div className={`${styles.additivesList} f-column gap-10`}>
                                    <CartAdditiveItem short_description={"добавка"} id={1} price={49}
                                                      image={getImgPath("productAdditive.png")} title={"Сырный соус"}/>
                                    <CartAdditiveItem short_description={"добавка"} id={2} price={69}
                                                      image={getImgPath("productAdditive.png")} title={"Сырный соус"}/>
                                    <CartAdditiveItem short_description={"добавка"} id={3} price={39}
                                                      image={getImgPath("productAdditive.png")} title={"Сырный соус"}/>
                                    <CartAdditiveItem short_description={"добавка"} id={4} price={69}
                                                      image={getImgPath("productAdditive.png")} title={"Сырный соус"}/>
                                </div>
                            </div>
                        </div> : null

                }

                <div className={`${styles.top} w-100p d-f al-end jc-end pd-0-20`}>
                    <div onClick={handleCloseCart} className={`closeWrapper`}>
                        <CloseIcon isDark={true}/>
                    </div>

                </div>
                <div className={`${styles.content} pd-20 f-1 f-column-betw`}>
                    <div className="f-column gap-25">
                        <div className="itemsBlock f-column gap-20">
                            <h2>
                                {
                                    items.length ? `${totalCount} товаров на ${formatNumberWithSpaces(totalPrice)} ₽` :
                                        "Корзина пуста"
                                }
                            </h2>
                            {
                                items.some(item => item.product !== undefined ? item.product.id == -1 : null) ?
                                    <div className={`${styles.info} d-f al-center gap-10`}>
                                        <InfoCircle className={styles.infoIcon} height={18} width={18}/>
                                        <p>
                                            Некоторые блюда из вашей корзины <br/> разобрали или у нас закончились
                                            ингредиенты.
                                        </p>
                                    </div> : null
                            }
                            {
                                !items.length ?
                                    <div className={`d-f gap-10`}>
                                        <InfoCircle className={styles.infoIcon} height={18} width={18}/>
                                        <div className={`${styles.emptyText} f-column`}>
                                            <p>
                                                В вашей корзине пусто, откройте «Меню» <br/> и выберите понравившийся
                                                товар.
                                            </p>
                                            <b>
                                                Мы доставим ваш заказ от 499 ₽.
                                            </b>
                                        </div>

                                    </div>
                                : null
                            }
                            <CartList/>

                        </div>
                        {
                            items.length ?
                                <div className="additivesBlock f-column gap-5">
                                    <h3>Добавить к заказу?</h3>
                                    <div className={"f-row-betw gap-10"}>
                                        <div onClick={handleOpenAdditives}
                                             className={`${styles.souses} cur-pointer al-center bg-white pd-20 f-column gap-5`}>
                                            <div style={{backgroundImage: `url(${getImgPath("productAdditive.png")})`}}
                                                 className={styles.img}></div>
                                            <p>Соусы</p>
                                        </div>
                                        <div
                                            className={`${styles.bread} cur-pointer h-100p f-1 bg-white pd-20 gap-10 d-f al-center`}>
                                            <img className={"d-b"} src={getImgPath("bread.png")} alt=""/>
                                            <div className="f-column">
                                                <div className={styles.title}>Хлебная корзина</div>
                                                <p>от 319₽</p>
                                            </div>

                                        </div>
                                    </div>
                                </div> : null
                        }

                    </div>


                </div>
                <div className={`${styles.bottom} f-column gap-15`}>
                    <div className="f-row-betw">
                        <b>Сумма заказа</b>
                        <b>{formatNumberWithSpaces(totalPrice)} ₽</b>
                    </div>
                    {
                        items.length ?
                            <RedButton onClick={handleToOrder}
                                       disabled={items.some(item => item.product !== undefined && item.product.id < 0)}
                                       className={"w-100p pd-15"}>К
                                оформлению</RedButton> :
                            <RedButton onClick={handleToCatalog}
                                       disabled={items.some(item => item.product !== undefined && item.product.id < 0)}
                                       className={"w-100p pd-15"}>Перейти в меню</RedButton>
                    }

                </div>
            </div>
        </ShadowWrapper>
    );
};

export default Cart;