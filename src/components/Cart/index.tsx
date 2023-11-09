import React, {FC, useEffect, useMemo, useState} from 'react';
import ShadowWrapper from "../Windows/ShadowWrapper";
import {CloseIcon, InfoCircle, MiniClose, MinusIcon, PlusIcon} from "../../icons";
import styles from './cart.module.scss'
import RedButton from "../Buttons/RedButton";
import {getImgPath} from "../../utils/getAssetsPath";
import List from "../List";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {formatNumberWithSpaces} from "../../utils/numberWithSpaces";
import {editCountCart, removeFromCart, removeProduct} from "../../features/cart/cartSlice";
import {
    handleCartOpened,
    handleProductAdditives,
    setChangingAdditivesMode,
    setProductAdditivesData
} from "../../features/modals/modalsSlice";
import {CartProductItem, Supplement} from "../../types/api.types";
import {domain} from "../../http/instance/instances";
import {useNavigate} from "react-router-dom";


type CartItemProps = {
    canNotBeAdded?: boolean,
    canBeChanged?: boolean,
} & CartProductItem
const CartItem: FC<CartItemProps> = ({canNotBeAdded = false, id, count, supplements, product}) => {
    const dispatch = useAppDispatch()
    const {items} = useAppSelector(state => state.products)
    const handleChange = () => {
        const findedProduct = items.filter(item => item.id === product.id)[0]
        dispatch(setChangingAdditivesMode(true))
        dispatch(setProductAdditivesData({
            id: findedProduct.id,
            is_combo: false,
            description: findedProduct.composition,
            cart_id: id,
            imageUrl: findedProduct.image,
            name: findedProduct.title,
            price: findedProduct.price,
            weight: findedProduct.weight,
            currentAdditive: 0,
            additives: findedProduct.supplements,
        }))
        dispatch(handleProductAdditives())
    }

    const supplementsPrice = supplements.length > 0 ? supplements.reduce((a, b) => {
        return a + b.price
    }, 0) : 0

    const canBeChanged = items.some(item => item.supplements.length > 0 && item.id === product.id)
    return (
        <div className={`${styles.cartItem} ${canNotBeAdded ? styles.cartItemDisabled : ""} pd-15 bg-white `}>
            <div className={`${styles.itemInfo} w-100p d-f gap-15`}>
                <div style={{backgroundImage: `url("${domain}/${product.image}")`}}
                     className={`${styles.image} bg-cover`}></div>
                <div className="text f-column gap-5 f-1 al-self-center">
                    <div className={"f-column gap-5"}>
                        <b>{product.title}</b>
                        <p>{product.composition || "Описания нет"}</p>
                        {
                            supplements.length > 0 ?
                                <p>+ {supplements.map(item => item.title).join(", ")}</p>
                                : null
                        }

                    </div>
                    {
                        canNotBeAdded ?
                            <div className={`${styles.error} colorError`}>
                                Не можем добавить к заказу. Замените на другое блюдо.
                            </div> : null
                    }

                </div>
                <div className="h-100p">
                    <div onClick={() => dispatch(removeFromCart({
                        cart_id: id
                    }))} className="close cur-pointer w-content h-content">
                        <MiniClose/>
                    </div>
                </div>

            </div>
            <div className={`${styles.itemBottom} f-row-betw`}>
                {
                    !canNotBeAdded ?
                        <>
                            <b className={styles.price}>
                                {formatNumberWithSpaces((product.price + supplementsPrice) * count)} ₽
                            </b>
                            <div className="d-f gap-20">
                                {
                                    canBeChanged ? <div onClick={handleChange}
                                                        className={`colorRed cur-pointer ${styles.delete}`}>Изменить</div> : null
                                }

                                <div className={"d-f al-center gap-5"}>
                                    <div onClick={() => {
                                        if (count > 1) {
                                            dispatch(editCountCart({
                                                cart_id: id,
                                                count: count - 1,
                                                id: product.id

                                            }))
                                        }
                                    }} className={"cur-pointer f-c-col"}><MinusIcon fill={"#434343"} width={12}/></div>

                                    <div className={styles.count}>{count}</div>
                                    <div onClick={() => {
                                        dispatch(editCountCart({
                                            cart_id: id,
                                            count: count + 1,
                                            id: product.id
                                        }))
                                    }} className={"cur-pointer f-c-col"}><PlusIcon fill={"#434343"} width={12}/></div>

                                </div>
                            </div>

                        </> :
                        <div className="w-100p jc-end d-f">
                            <div onClick={() => dispatch(removeProduct(id))}
                                 className={`colorRed cur-pointer ${styles.delete}`}>Удалить
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

const CartAdditiveItem: FC<Supplement> = ({id, price, short_description, title, image}) => {
    return (
        <div className={`${styles.additiveItem} f-row-betw gap-30`}>
            <div className="d-f al-center gap-10">
                <img src={getImgPath("productAdditive.png")} alt=""/>
                <div className="f-column">
                    <p>{title}</p>
                    <b>{price} ₽</b>
                </div>
            </div>
            {
                0 ?
                    <div className={"d-f al-center gap-5"}>
                        <div onClick={() => {
                        }} className={"cur-pointer f-c-col"}><MinusIcon fill={"#434343"} width={12}/></div>

                        <div className={styles.count}>{0}</div>
                        <div onClick={() => {
                        }} className={"cur-pointer f-c-col"}><PlusIcon fill={"#434343"} width={12}/></div>

                    </div> :
                    <div className={`${styles.add} colorRed cur-pointer`}>Добавить</div>
            }

        </div>
    )
}


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
                                items.some(item => item.product.id == -1) ?
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

                            <List
                                listBlockClassname={`${styles.listProducts} f-column gap-5`}
                                list={items}
                                renderItem={(item) => (
                                    <CartItem
                                        is_combo={item.is_combo}
                                        supplements={item.supplements}
                                        id={item.id}
                                        count={item.count}
                                        key={item.id}
                                        canNotBeAdded={item.id < 0}
                                        product={{
                                            composition: item.product.composition,
                                            id: item.product.id,
                                            image: item.product.image,
                                            price: item.product.price,
                                            short_description: item.product.short_description,
                                            title: item.product.title
                                        }}
                                    />
                                )}
                            />

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
                            <RedButton onClick={handleToOrder} disabled={items.some(item => item.product.id < 0)}
                                       className={"w-100p pd-15"}>К
                                оформлению</RedButton> :
                            <RedButton onClick={handleToCatalog} disabled={items.some(item => item.product.id < 0)}
                                       className={"w-100p pd-15"}>Перейти в меню</RedButton>
                    }

                </div>
            </div>
        </ShadowWrapper>
    );
};

export default Cart;