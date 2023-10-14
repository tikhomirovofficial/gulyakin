import React, {FC, useEffect, useRef, useState} from 'react';
import {ArrowMiniRightIcon, Cap, SafeArrowIcon} from "../../icons";
import styles from '../Restaurants/restaurants.module.scss'
import GradientGrayBtn from "../../components/Buttons/GradientGrayButton";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import LogosSection from "../../components/LogosSection";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setTempPage} from "../../features/main/mainSlice";
import {Link} from "react-router-dom";
import RedButton from "../../components/Buttons/RedButton";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'
import {getImgPath} from "../../utils/getAssetsPath";
import {SwiperProps} from "swiper/swiper-react";
import {RestaurantItemType} from "../../types/restaurants.types";

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
const idRestaurant = 1

const ChosenRestaurant: FC = () => {
    const dispatch = useAppDispatch()
    const restaurantImagesSlider = useRef<SwiperProps>(null)
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [isEndSlider, setIsEndSlider] = useState(false)

    const handleNext = () => {
        restaurantImagesSlider.current.swiper.slideNext();
    }

    const handlePrev = () => {
        restaurantImagesSlider.current.swiper.slidePrev();
    }
    const {coords, logoIconSrc, phone, street, cityArea, images} = useAppSelector(state => state.restaurants.chosen)


    return (
        <>
            <Header/>
            <LogosSection/>
            <div className={`${styles.main} f-column gap-20`}>
                <div className="wrapper w-100p">
                    <div className={`${styles.block} f-column gap-25`}>
                        <Link to={"/"}>
                            <GradientGrayBtn className={`${styles.backButton} cur-pointer d-f gap-10`}>
                                <Cap/>
                                <p>Вернуться в меню</p>
                            </GradientGrayBtn>
                        </Link>

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
                                            <h3 className={styles.addressTitle}>{street}</h3>
                                            <p className={styles.addressAreaText}>{cityArea}</p>
                                        </div>
                                        <div className="d-f p-rel">
                                            {
                                                currentSlide > 0 ?
                                                    <div style={{transform: "rotateZ(180deg)"}} className={`${styles.sliderArrowWrapper} ${styles.sliderArrowWrapperLeft} d-f jc-end al-center h-100p p-abs left-0`}>
                                                        <div onClick={handlePrev} className="f-c-col sliderArrowCircle cur-pointer">
                                                            <SafeArrowIcon width={7}/>
                                                        </div>

                                                    </div> : null
                                            }

                                            {
                                                currentSlide < images.length - 2  ?  <div onClick={handleNext} className={`${styles.sliderArrowWrapper} ${styles.sliderArrowWrapperRight} d-f  jc-end al-center h-100p p-abs right-0`}>
                                                    <div className="f-c-col sliderArrowCircle cur-pointer">
                                                        <SafeArrowIcon width={7}/>
                                                    </div>

                                                </div> : null
                                            }

                                            <Swiper
                                                style={{margin: 0}}
                                                slidesPerView={'auto'}
                                                centeredSlides={false}
                                                className={styles.gallery}
                                                onActiveIndexChange={(slider: SwiperProps) => {
                                                    setIsEndSlider(slider.isEnd)
                                                    setCurrentSlide(slider.activeIndex)
                                                }}
                                                ref={restaurantImagesSlider}
                                                spaceBetween={20}
                                            >
                                                {
                                                    images.map(src => (
                                                        <SwiperSlide className={"w-content cur-grabbing"}>
                                                            <div style={{backgroundImage: `url(${src})`}} className={`${styles.item} bg-cover`}>

                                                            </div>
                                                        </SwiperSlide>
                                                    ))
                                                }
                                            </Swiper>
                                        </div>



                                    </div>
                                    <div className={`${styles.workTimeBlock} f-column gap-20 f-1`}>
                                        <div className="f-column">
                                            <p className={styles.phoneLabel}>Телефон</p>
                                            <div className={styles.phone}>{phone}</div>
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
                                        <ChosenRestaurantMap coords={coords} logoIconSrc={logoIconSrc}/>
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

type ChosenRestaurantMapProps = Pick<RestaurantItemType, "coords"> & {
    logoIconSrc: string
}
const ChosenRestaurantMap: FC<ChosenRestaurantMapProps> = React.memo(({coords, logoIconSrc}) => {
    return (
        <Map className={"h-100p w-100p"}
             state={{center: coords, zoom: 13}}>
            <Placemark geometry={coords} options={
                {
                    iconLayout: 'default#image', // Используем стандартный макет изображения
                    iconImageHref: logoIconSrc, // Укажите URL вашей кастомной иконки
                    iconImageSize: [52, 52], // Размер вашей иконки
                    iconImageOffset: [-26, -26],
                }
            }/>
        </Map>
    )
})
export default ChosenRestaurant;