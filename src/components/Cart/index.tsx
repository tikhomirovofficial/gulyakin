import React from 'react';
import ShadowWrapper from "../Windows/ShadowWrapper";
import {CloseIcon, InfoCircle, MiniClose, MinusIcon, PlusIcon} from "../../icons";
import styles from './cart.module.scss'
import RedButton from "../Buttons/RedButton";
import {getImgPath} from "../../utils/getAssetsPath";


const CartItem = () =>{

}


const Cart = () => {
    return (
        <ShadowWrapper className={"d-f jc-end"}>
            <div className={`${styles.cartBlock} bg-white f-column`}>
                <div className="w-100p d-f al-end jc-end pd-0-20">
                    <div onClick={() => {
                    }} className={`closeWrapper`}>
                        <CloseIcon isDark={true}/>
                    </div>

                </div>
                <div className={`${styles.content} pd-20 f-1 f-column-betw`}>
                    <div className="f-column">
                        <div className="itemsBlock f-column gap-20">
                            <h2>6 товаров на 2 473 ₽</h2>
                            <div className={`${styles.info} d-f al-center gap-10`}>
                                <InfoCircle/>
                                <p>
                                    Некоторые блюда из вашей корзины <br/> разобрали или у нас закончились ингредиенты.
                                </p>
                            </div>
                            <div className="list f-column gap-5">
                                <div className={`${styles.cartItem} pd-15 bg-white `}>
                                    <div className={`${styles.itemInfo} w-100p d-f gap-15`}>
                                        <div style={{backgroundImage: `url(${getImgPath('product.jpg')})`}} className={`${styles.image} bg-cover`}></div>
                                        <div className="text f-column gap-5 f-1 al-self-center">
                                            <div className={"f-column gap-5"}>
                                                <b>Пельмени с говядиной</b>
                                                <p>Свинина, говядина</p>
                                            </div>
                                            {/*<div className={`${styles.error} colorError`}>*/}
                                            {/*    Не можем добавить к заказу. Замените на другое блюдо.*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="h-100p">
                                            <div className="close w-content h-content">
                                                <MiniClose/>
                                            </div>
                                        </div>

                                    </div>
                                    <div className={`${styles.itemBottom} f-row-betw`}>
                                        <b className={styles.price}>
                                            473 ₽
                                        </b>
                                        <div  className={"d-f al-center gap-10"}>
                                            <div onClick={() => {}} className={"cur-pointer f-c-col"}><MinusIcon fill={"#434343"} width={12}/></div>

                                            <div className={styles.count}>{1}</div>
                                            <div onClick={() => {}} className={"cur-pointer f-c-col"}><PlusIcon fill={"#434343"} width={12}/></div>

                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.cartItem} pd-15 bg-white `}>
                                    <div className={`${styles.itemInfo} w-100p d-f gap-15`}>
                                        <div style={{backgroundImage: `url(${getImgPath('product.jpg')})`}} className={`${styles.image} bg-cover`}></div>
                                        <div className="text f-column gap-5 f-1 al-self-center">
                                            <div className={"f-column gap-5"}>
                                                <b>Пельмени с говядиной</b>
                                                <p>Свинина, говядина</p>
                                            </div>
                                            {/*<div className={`${styles.error} colorError`}>*/}
                                            {/*    Не можем добавить к заказу. Замените на другое блюдо.*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="h-100p">
                                            <div className="close w-content h-content">
                                                <MiniClose/>
                                            </div>
                                        </div>

                                    </div>
                                    <div className={`${styles.itemBottom} f-row-betw`}>
                                        <b className={styles.price}>
                                            473 ₽
                                        </b>
                                        <div  className={"d-f al-center gap-10"}>
                                            <div onClick={() => {}} className={"cur-pointer f-c-col"}><MinusIcon fill={"#434343"} width={12}/></div>

                                            <div className={styles.count}>{1}</div>
                                            <div onClick={() => {}} className={"cur-pointer f-c-col"}><PlusIcon fill={"#434343"} width={12}/></div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="additivesBlock">
                            <h3>Добавить к заказу?</h3>
                            <div className="list">
                                additives
                            </div>
                        </div>
                    </div>


                </div>
                <div className={`${styles.bottom} f-column gap-15`}>
                    <div className="f-row-betw">
                        <b>Сумма заказа</b>
                        <b>2 473 ₽</b>
                    </div>
                    <RedButton className={"w-100p pd-15"}>К оформлению</RedButton>
                </div>
            </div>
        </ShadowWrapper>
    );
};

export default Cart;