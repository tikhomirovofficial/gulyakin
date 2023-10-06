import React, {FC, useEffect, useState} from 'react';
import {ArrowMiniRightIcon, Cap} from "../../icons";
import styles from '../Restaurants/restaurants.module.scss'
import GradientGrayBtn from "../../components/Buttons/GradientGrayButton";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Map, YMaps} from '@pbe/react-yandex-maps';
import LogosSection from "../../components/LogosSection";
import {useAppDispatch} from "../../app/hooks";
import {setTempPage} from "../../features/main/mainSlice";
import {Link} from "react-router-dom";
import RedButton from "../../components/Buttons/RedButton";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'

const ChosenRestaurant: FC = () => {
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
                            <Link to={"/restaurants"} className="d-f al-center gap-10">
                                <div style={{transform: "rotateZ(180deg)"}} className="f-c-col">
                                    <ArrowMiniRightIcon width={17} height={17}/>
                                </div>
                                <div className="sectionTitle">
                                    Все рестораны
                                </div>
                            </Link>

                            <div className={`of-hide w-100p f-row-betw ${styles.restaurantsSection}`}>
                                <div className={`${styles.sideWrapper} ${styles.choosenRestaruantBlock} f-column-betw gap-20 pd-20`}>
                                    <div className="top f-column gap-15">
                                        <div className="address f-column">
                                            <h3 className={styles.addressTitle}>ул. Энергетиков, д. 4</h3>
                                            <p className={styles.addressAreaText}>Центральный район</p>
                                        </div>

                                        <Swiper
                                            style={{margin: 0}}
                                            slidesPerView={'auto'}
                                            centeredSlides={false}
                                            className={styles.gallery}
                                            spaceBetween={20}
                                        >
                                            <SwiperSlide className={"w-content"}>
                                                <div className={styles.item}>

                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className={"w-content"}>
                                                <div className={styles.item}>

                                                </div>
                                            </SwiperSlide>
                                        </Swiper>


                                    </div>
                                    <div className={`${styles.workTimeBlock} f-column gap-20 f-1`}>
                                        <div className="f-column">
                                            <p className={styles.phoneLabel}>Телефон</p>
                                            <div className={styles.phone}>+7 (951) 735-89-45</div>
                                        </div>
                                        <div className={`f-column gap-5 ${styles.workClocks}`}>
                                            <p className={styles.phoneLabel}>График работы</p>
                                            <div className={"f-row-betw"}>
                                                <b>Понедельник</b>
                                                <b>10:30-00:00</b>
                                            </div>
                                            <div className={"f-row-betw"}>
                                                <b>Вторник</b>
                                                <b>10:30-00:00</b>
                                            </div>
                                            <div className={"f-row-betw"}>
                                                <b>Среда</b>
                                                <b>10:30-00:00</b>
                                            </div>
                                            <div className={"f-row-betw"}>
                                                <b>Четверг</b>
                                                <b>10:30-00:00</b>
                                            </div>
                                            <div className={"f-row-betw colorRed"}>
                                                <b>Пятница</b>
                                                <b>10:30-00:00</b>
                                            </div>
                                            <div className={"f-row-betw"}>
                                                <b>Суббота</b>
                                                <b>10:30-00:00</b>
                                            </div>
                                            <div className={"f-row-betw"}>
                                                <b>Воскресенье</b>
                                                <b>10:30-00:00</b>
                                            </div>
                                        </div>
                                    </div>
                                    <RedButton disabled={false} className={"pd-10-0"}>Забронировать столик</RedButton>
                                </div>

                                <div className={`${styles.map} h-100p f-1`}>
                                    <YMaps>
                                        <Map className={"h-100p w-100p"}
                                             state={{center: currentCoords, zoom: 9}}/>
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

export default ChosenRestaurant;