import React, {FC, useEffect, useState} from 'react';
import {ArrowMiniRightIcon, Cap, SafeArrowIcon} from "../../icons";
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
import {getImgPath} from "../../utils/getAssetsPath";

const weekItems = [
    {
        day: "Воскресенье",
        workTime: "10:30-00:00"
    },
    {
        day: "Понедельник",
        workTime: "10:30-00:00"
    },
    {
        day: "Вторник",
        workTime: "10:30-00:00"
    },
    {
        day: "Среда",
        workTime: "10:30-00:00"
    },
    {
        day: "Четверг",
        workTime: "10:30-00:00"
    },
    {
        day: "Пятница",
        workTime: "10:30-00:00"
    },
    {
        day: "Суббота",
        workTime: "10:30-00:00"
    },

]
const today = new Date();
const dayOfWeek = today.getDay()

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
                                        <div className="d-f p-rel">
                                            <div style={{transform: "rotateZ(180deg)"}} className={`${styles.sliderArrowWrapper} ${styles.sliderArrowWrapperLeft} d-f jc-end al-center h-100p p-abs left-0`}>
                                                <div className="f-c-col">
                                                    <SafeArrowIcon width={7}/>
                                                </div>

                                            </div>
                                            <div className={`${styles.sliderArrowWrapper} ${styles.sliderArrowWrapperRight} d-f jc-end al-center h-100p p-abs right-0`}>
                                                <div className="f-c-col">
                                                    <SafeArrowIcon width={7}/>
                                                </div>

                                            </div>
                                            <Swiper
                                                style={{margin: 0}}
                                                slidesPerView={'auto'}
                                                centeredSlides={false}
                                                className={styles.gallery}
                                                spaceBetween={20}
                                            >
                                                <SwiperSlide className={"w-content"}>
                                                    <div style={{backgroundImage: `url(${getImgPath("restaurant.jpg")})`}} className={`${styles.item} bg-cover`}>

                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide className={"w-content"}>
                                                    <div style={{backgroundImage: `url(${getImgPath("restaurant.jpg")})`}} className={`${styles.item} bg-cover`}>

                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide className={"w-content"}>
                                                    <div style={{backgroundImage: `url(${getImgPath("restaurant.jpg")})`}} className={`${styles.item} bg-cover`}>

                                                    </div>
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>



                                    </div>
                                    <div className={`${styles.workTimeBlock} f-column gap-20 f-1`}>
                                        <div className="f-column">
                                            <p className={styles.phoneLabel}>Телефон</p>
                                            <div className={styles.phone}>+7 (951) 735-89-45</div>
                                        </div>
                                        <div className={`f-column gap-5 ${styles.workClocks}`}>
                                            <p className={styles.phoneLabel}>График работы</p>
                                            {
                                                weekItems.map((item, index) => (
                                                    index > 0 ?  <div className={`f-row-betw ${index === dayOfWeek? "colorRed" : ""}`}>
                                                        <b>{item.day}</b>
                                                        <b>{item.workTime}</b>
                                                    </div> : null

                                                ))
                                            }
                                            <div className={`f-row-betw ${dayOfWeek === 0 && "colorRed"}`}>
                                                <b>{weekItems[0].day}</b>
                                                <b>{weekItems[0].workTime}</b>
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