import React, {FC, useMemo} from 'react';
import ShadowWrapper from "../Windows/ShadowWrapper";
import {CloseIcon, InfoCircle, MiniClose, MinusIcon, PlusIcon} from "../../icons";
import styles from './cart.module.scss'
import RedButton from "../Buttons/RedButton";
import {getImgPath} from "../../utils/getAssetsPath";
import {Product} from "../../types/products.types";
import List from "../List";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {formatNumberWithSpaces} from "../../utils/numberWithSpaces";
import {CartProduct} from "../../types/cart.types";
import {minusProduct, plusProduct, removeProduct} from "../../features/cart/cartSlice";


type CartItemProps = {
    canNotBeAdded?: boolean
} & Pick<CartProduct, "price" | "imageUrl" | "name" | "description" | "count" | "id" >
const CartItem: FC<CartItemProps> = ({canNotBeAdded = false, id, price, count, name, description, imageUrl}) =>{
    const dispatch = useAppDispatch()

    return (
        <div className={`${styles.cartItem} ${canNotBeAdded ? styles.cartItemDisabled : ""} pd-15 bg-white `}>
            <div className={`${styles.itemInfo} w-100p d-f gap-15`}>
                <div style={{backgroundImage: `url(${imageUrl})`}} className={`${styles.image} bg-cover`}></div>
                <div className="text f-column gap-5 f-1 al-self-center">
                    <div className={"f-column gap-5"}>
                        <b>{name}</b>
                        <p>{description}</p>
                    </div>
                    {
                        canNotBeAdded ?
                            <div className={`${styles.error} colorError`}>
                                Не можем добавить к заказу. Замените на другое блюдо.
                            </div> : null
                    }

                </div>
                <div className="h-100p">
                    <div onClick={() => dispatch(removeProduct(id))} className="close w-content h-content">
                        <MiniClose/>
                    </div>
                </div>

            </div>
            <div className={`${styles.itemBottom} f-row-betw`}>
                {
                    !canNotBeAdded ?
                    <>
                        <b className={styles.price}>
                            {formatNumberWithSpaces(price * count)} ₽
                        </b>
                        <div  className={"d-f al-center gap-10"}>
                            <div onClick={() => dispatch(minusProduct(id))} className={"cur-pointer f-c-col"}><MinusIcon fill={"#434343"} width={12}/></div>

                            <div className={styles.count}>{count}</div>
                            <div onClick={() => dispatch(plusProduct(id))} className={"cur-pointer f-c-col"}><PlusIcon fill={"#434343"} width={12}/></div>

                        </div>
                    </>:
                        <div className="w-100p jc-end d-f">
                            <div onClick={() => dispatch(removeProduct(id))} className={`colorRed cur-pointer ${styles.delete}`}>Удалить</div>
                        </div>
                }

            </div>
        </div>
    )
}


const Cart = () => {
    const dispatch = useAppDispatch()
    const {items, totalPrice} = useAppSelector(state => state.cart)

    const totalCount = useMemo(() => {
        return items.reduce((prev, cur) => {
            return prev + cur.count
        }, 0)
    }, [items])

    const handleToOrder = () => {

    }

    const handleToCatalog = () => {

    }

    return (
        <ShadowWrapper className={"d-f jc-end p-fix h-100v w-100v"}>

            <div className={`${styles.cartBlock} bg-white f-column p-rel`}>
                <div className={"p-abs h-100p w-100p"}>
                    <ShadowWrapper className={"d-f al-end h-100p w-100p p-abs top-0"}>
                    </ShadowWrapper>
                    <div className={`${styles.cartAdditivesBar} bg-white p-abs left-0 w-100p pd-30`}>
                        Добавки
                    </div>
                </div>

                <div className={`${styles.top} w-100p d-f al-end jc-end pd-0-20`}>
                    <div onClick={() => {
                    }} className={`closeWrapper`}>
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
                                items.some(item => item.isNotCanBeAdded) ?
                                    <div className={`${styles.info} d-f al-center gap-10`}>
                                        <InfoCircle className={styles.infoIcon} height={18} width={18}/>
                                        <p>
                                            Некоторые блюда из вашей корзины <br/> разобрали или у нас закончились ингредиенты.
                                        </p>
                                    </div> : null
                            }
                            {
                                !items.length ?
                                    <div className={`d-f gap-10`}>
                                        <InfoCircle className={styles.infoIcon} height={18} width={18}/>
                                        <div className={`${styles.emptyText} f-column`}>
                                            <p>
                                                В вашей корзине пусто, откройте «Меню» <br/> и выберите понравившийся товар.
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
                                        id={item.id}
                                        count={item.count}
                                        key={item.id}
                                        canNotBeAdded={item.isNotCanBeAdded}
                                        price={item.price}
                                        name={item.name}
                                        imageUrl={item.imageUrl}
                                        description={item.description}
                                    />
                                )}
                            />

                        </div>
                        {
                            items.length ?
                                <div className="additivesBlock f-column gap-5">
                                    <h3>Добавить к заказу?</h3>
                                    <div className={"f-row-betw gap-10"}>
                                        <div className={`${styles.souses} cur-pointer al-center bg-white pd-20 f-column gap-5`}>
                                            <div style={{backgroundImage: `url(${getImgPath("productAdditive.png")})`}} className={styles.img}></div>
                                            <p>Соусы</p>
                                        </div>
                                        <div className={`${styles.bread} cur-pointer h-100p f-1 bg-white pd-20 gap-10 d-f al-center`}>
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
                            <RedButton disabled={items.some(item => item.isNotCanBeAdded)} className={"w-100p pd-15"}>К оформлению</RedButton> :
                            <RedButton disabled={items.some(item => item.isNotCanBeAdded)} className={"w-100p pd-15"}>Перейти в меню</RedButton>
                    }

                </div>
            </div>
        </ShadowWrapper>
    );
};

export default Cart;