import React, {FC, useEffect, useState} from 'react';
import {Cap} from "../../icons";
import styles from './restaurants.module.scss'
import GradientGrayBtn from "../../components/Buttons/GradientGrayButton";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import LogosSection from "../../components/LogosSection";
import {useAppDispatch} from "../../app/hooks";
import {setTempPage} from "../../features/main/mainSlice";
import {getImgPath} from "../../utils/getAssetsPath";

const logosIsMax = true

const RestaurantItem = () => {
    return (
        <div className={styles.itemWrapper}>
            <div className={styles.item}>
                <div className={"f-column gap-10"}>
                    <div className="f-column f-1 gap-5">
                        <b>ул. Энергетиков, д. 4</b>
                        <p>Центральный район</p>
                    </div>
                    <div className={styles.bottomText}>
                        Доступно онлайн бронирование столика
                    </div>
                </div>
            </div>
        </div>
    )
}

const Restaurants: FC = () => {
    const dispatch = useAppDispatch()
    const [currentCoords, setCurrentCoords] = useState([55.75, 37.57])

    return (
        <>
            <Header/>
            <LogosSection/>
            <div className={`${styles.main} f-column gap-20`}>
                <div className="wrapper w-100p">
                    <div className={`${styles.block} f-column gap-25`}>
                        <GradientGrayBtn onClick={() => dispatch(setTempPage(0))} className={`${styles.backButton} cur-pointer d-f gap-10`}>
                            <Cap/>
                            <p>Вернуться в меню</p>
                        </GradientGrayBtn>
                        <div className="f-column gap-20">
                            <div className="sectionTitle">
                                35 кафе Гулякин в Сургуте
                            </div>
                            <div className={`of-hide w-100p f-row-betw ${styles.restaurantsSection}`}>
                                <div className={styles.sideWrapper}>
                                    <RestaurantItem/>
                                    <RestaurantItem/>
                                    <RestaurantItem/>
                                    <RestaurantItem/>
                                    <RestaurantItem/>
                                    <RestaurantItem/>
                                    <RestaurantItem/>
                                </div>

                                <div className={`${styles.map} h-100p f-1`}>
                                    <YMaps>
                                        <Map className={"h-100p w-100p"}
                                             state={{center: currentCoords, zoom: 9}}>
                                            <Placemark geometry={currentCoords} options={
                                                {
                                                    iconLayout: 'default#image', // Используем стандартный макет изображения
                                                    iconImageHref: getImgPath("product.jpg"), // Укажите URL вашей кастомной иконки
                                                    iconImageSize: [32, 32], // Размер вашей иконки
                                                    iconImageOffset: [-16, -16],
                                                }
                                            }/>
                                        </Map>

                                    </YMaps>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>

    );
};

export default Restaurants;