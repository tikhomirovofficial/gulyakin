import React, {useState} from 'react';
import {Link} from "react-router-dom";
import styles from "../../pages/Main/main.module.scss";
import {ArrowMiniRightIcon, CartIcon, Logo, ProfileIcon} from "../../icons";
import RedButton from "../Buttons/RedButton";
import GrayButton from "../Buttons/GrayButton";
import DropdownList from "../DropdownList";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setCurrentCity, toggleAskCityVisible, toggleChangingGeo} from "../../features/main/mainSlice";
import {handleCartOpened, handleLogin} from "../../features/modals/modalsSlice";
import {addToStorage, getFromStorage} from "../../utils/LocalStorageExplorer";
import {formatNumberWithSpaces} from "../../utils/numberWithSpaces";
import useAuth from "../../hooks/useAuth";
import useToken from "../../hooks/useToken";



const Header = () => {
    console.log(getFromStorage("city"))
    const dispatch = useAppDispatch()

    const {totalPrice} = useAppSelector(state => state.cart)
    const {cities, currentGeo, changingGeo, askCityVisible} = useAppSelector(state => state.main)

    const user = useAppSelector(state => state.profile)
    const token = useToken()

    const handleChangingGeo = () =>  dispatch(toggleChangingGeo())
    const handleAskCity = () => {
        dispatch(toggleAskCityVisible())
        addToStorage("city", currentGeo.city)
    }

    const handleNotYourCity = () => {
        handleChangingGeo()
        dispatch(toggleAskCityVisible())
    }

    return (
        <header className={styles.header}>
            <div className="wrapper">
                <div className="block pd-30-0 f-row-betw gap-40">
                    <div className="left d-f al-center gap-35">
                        <Link to={"/"} className="">
                            <Logo/>
                        </Link>
                        <div className={`${styles.logoText} p-rel f-column gap-5`}>
                            <p>Доставка готовый еды</p>
                            <div className={`d-f al-center gap-10`}>
                                <p>в городе</p>
                                <div onClick={handleChangingGeo} className={`${styles.city} d-f al-center gap-5 cur-pointer`}>
                                    <b>{cities[currentGeo.city]}</b>
                                    <ArrowMiniRightIcon height={11}/>
                                </div>
                                {
                                     askCityVisible ? <div
                                        className={`${styles.geoPopup} ${styles.yourCity} f-column gap-15 p-abs bg-white`}>
                                        <b className={"txt-center"}>Это ваш город?</b>
                                        <div className="d-f gap-5 jc-around">
                                            <RedButton onClick={handleAskCity} className={styles.btn}>Да</RedButton>
                                            <GrayButton onClick={handleNotYourCity} className={styles.btn}>Другой</GrayButton>
                                        </div>

                                    </div> : null
                                }
                                {
                                    changingGeo ?
                                        <DropdownList selectHandler={(current) => dispatch(setCurrentCity(current))} classNameItem={`${styles.selectCityItem} f-row-betw`}
                                                      className={`${styles.geoPopup} f-column gap-15 p-abs bg-white `}
                                                      items={cities} current={currentGeo.city}/>
                                        : null
                                }


                            </div>

                        </div>
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
                    {

                    }
                    <div className={`${styles.right} d-f al-center gap-20`}>
                        {
                            !token ?
                                <div onClick={() => dispatch(handleLogin())} className={`${styles.profileBtn} btn d-f al-center gap-5 cur-pointer`}>
                                    <ProfileIcon height={22} width={16}/>
                                    <b>
                                        Кабинет
                                    </b>
                                </div> :

                                <Link to={"/profile"} className={`${styles.profileBtn} btn d-f al-center gap-5 cur-pointer`}>
                                    <ProfileIcon height={22} width={16}/>
                                    <b>
                                        Кабинет
                                    </b>
                                </Link>
                        }

                        <div
                            onClick={() => dispatch(handleCartOpened())}
                            className={`${styles.cartBtnFilled} ${styles.cartBtn} btn d-f gap-5 al-center cur-pointer`}>
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