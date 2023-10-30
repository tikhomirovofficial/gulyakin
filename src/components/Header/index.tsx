import React from 'react';
import {Link} from "react-router-dom";
import styles from "../../pages/Main/main.module.scss";
import {ArrowMiniDown, ArrowMiniRightIcon, CartIcon, Logo, ProfileIcon} from "../../icons";
import RedButton from "../Buttons/RedButton";
import GrayButton from "../Buttons/GrayButton";
import DropdownList, {DropDownItem} from "../DropdownList";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setCurrentCity, toggleAskCityVisible, toggleChangingGeo} from "../../features/main/mainSlice";
import {handleCartOpened, handleLogin} from "../../features/modals/modalsSlice";
import {addToStorage, getFromStorage} from "../../utils/LocalStorageExplorer";
import {formatNumberWithSpaces} from "../../utils/numberWithSpaces";
import useToken from "../../hooks/useToken";
import List from "../List";
import SelectCity from "../SelectCity";


const Header = () => {
    const dispatch = useAppDispatch()

    const {totalPrice, cartClassOpened, cartAdded, cartAddedPopupInfo} = useAppSelector(state => state.cart)
    const {cities, currentGeo, changingGeo, askCityVisible} = useAppSelector(state => state.main)
    const token = useToken()



    return (
        <header className={styles.header}>
            <div className="wrapper">
                <div className={`${styles.block} pd-30-0 f-row-betw gap-40`}>
                    <div className={`${styles.left} d-f al-center gap-35`}>
                        <Link to={"/"} className="">
                            <Logo/>
                        </Link>
                        <SelectCity/>
                    </div>

                    <nav className={"d-f gap-20 f-1"}>
                        <Link className={`${styles.item} f-c-col p-rel`} to={"/"}>
                            <div className={`${styles.text} w-100p h-100p p-abs left-0`}>
                                О нас
                            </div>
                            <div className="hidden">О нас</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel`} to={"/"}>
                            <div className={`${styles.text} w-100p h-100p p-abs left-0`}>
                                Каталог
                            </div>
                            <div className="hidden">Каталог</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel`} to={"/"}>
                            <div className={`${styles.text} w-100p h-100p p-abs left-0`}>
                                Контакты
                            </div>
                            <div className="hidden">Контакты</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel`} to={"/"}>
                            <div className={`${styles.text} w-100p h-100p p-abs left-0`}>
                                Вакансии
                            </div>
                            <div className="hidden">Вакансии</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel`} to={"/"}>
                            <div className={`${styles.text} w-100p h-100p p-abs left-0`}>
                                Инвестиции
                            </div>
                            <div className="hidden">Инвестиции</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel`} to={"/"}>
                            <div className={`${styles.text} w-100p h-100p p-abs left-0`}>
                                Предложить помещение
                            </div>
                            <div className="hidden">Предложить помещение</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel`} to={"/"}>
                            <div className={`${styles.text} w-100p h-100p p-abs left-0`}>
                                Поставщикам
                            </div>
                            <div className="hidden">Поставщикам</div>
                        </Link>
                        <Link className={`${styles.item} f-c-col p-rel`} to={"/"}>
                            <div className={`${styles.text} w-100p h-100p p-abs left-0`}>
                                Помощь
                            </div>
                            <div className="hidden">Помощь</div>
                        </Link>

                    </nav>

                    <div className={`${styles.right} d-f al-center gap-20 p-rel`}>
                        {
                            !token ?
                                <div onClick={() => dispatch(handleLogin())}
                                     className={`${styles.profileBtn} btn d-f al-center gap-5 cur-pointer`}>
                                    <ProfileIcon height={22} width={16}/>
                                    <b>
                                        Кабинет
                                    </b>
                                </div> :

                                <Link to={"/profile"}
                                      className={`${styles.profileBtn} btn d-f al-center gap-5 cur-pointer`}>
                                    <ProfileIcon height={22} width={16}/>
                                    <b>
                                        Кабинет
                                    </b>
                                </Link>
                        }
                        {
                            cartAdded ?     <div className={`${styles.addedPopup}  ${cartClassOpened ? styles.addedPopupOpened : ""} p-abs f-column gap-5 t-opacity-visible-transform-3`}>
                                <p>В корзину добавлено:</p>
                                <b>{cartAddedPopupInfo.title}, {cartAddedPopupInfo.weight} г</b>
                            </div> : null
                        }

                        <div
                            onClick={() => dispatch(handleCartOpened())}
                            className={`${styles.cartBtnFilled} ${styles.cartBtn} gap-5 btn d-f al-center cur-pointer`}>
                            <CartIcon height={22} width={22}/>
                            <b>
                                {formatNumberWithSpaces(totalPrice)} ₽
                            </b>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;