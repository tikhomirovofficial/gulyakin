import React, {FC, useEffect, useRef, useState} from 'react';
import {ArrowMiniRightIcon, Cap, SafeArrowIcon} from "../../icons";
import styles from './chosenRestaurant.module.scss'
import GradientGrayBtn from "../../components/Buttons/GradientGrayButton";
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Link, useParams} from "react-router-dom";
import RedButton from "../../components/Buttons/RedButton";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'
import {SwiperProps} from "swiper/swiper-react";
import {RestaurantItemType} from "../../types/restaurants.types";
import {HasClassName} from "../../types/components.types";
import {domain} from "../../http/instance/instances";
import {getRestaurantData} from "../../features/restaurants/restaurantsSlice";
import useMarketLogo from "../../hooks/useMarketLogo";

const weekItems = [
    {
        id: 1,
        day: "Воскресенье",
        workTime: "10:30-00:00"
    },
    {
        id: 2,
        day: "Понедельник",
        workTime: "10:30-00:00"
    },
    {
        id: 3,
        day: "Вторник",
        workTime: "10:30-00:00"
    },
    {
        id: 4,
        day: "Среда",
        workTime: "10:30-00:00"
    },
    {
        id: 5,
        day: "Четверг",
        workTime: "10:30-00:00"
    },
    {
        id: 6,
        day: "Пятница",
        workTime: "10:30-00:00"
    },
    {
        id: 7,
        day: "Суббота",
        workTime: "10:30-00:00"
    },

]
const today = new Date();
const dayOfWeek = today.getDay()

const ChosenRestaurant: FC = () => {
    const dispatch = useAppDispatch()
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const restaurantImagesSlider = useRef<SwiperProps>(null)
    const params = useParams<{ id: string }>()
    const restaurantInfo = useAppSelector(state => state.restaurants.chosen.data)
    const logo = useMarketLogo()
    const {loading} = useAppSelector(state => state.restaurants.chosen)

    const handleNext = () => {
        restaurantImagesSlider.current.swiper.slideNext();
    }

    const handlePrev = () => {
        restaurantImagesSlider.current.swiper.slidePrev();
    }

    useEffect(() => {
        const numberedParamId = Number(params?.id)
        if (!isNaN(numberedParamId)) {
            dispatch(getRestaurantData({
                adress_id: numberedParamId
            }))
        }

    }, [])
    return (
        <>
            <div className={`${styles.main} f-column gap-20`}>

                <div className={`${styles.block} f-column gap-25`}>
                    <div className="wrapper w-100p">
                        <Link to={"/"}>
                            <GradientGrayBtn className={`${styles.backButton} cur-pointer d-f gap-10`}>
                                <Cap/>
                                <p>Вернуться в меню</p>
                            </GradientGrayBtn>
                        </Link>
                    </div>


                    <div className="f-column gap-20">
                        <div className="wrapper w-100p">
                            <Link to={"/restaurants"} className="d-f al-center gap-10">
                                <div style={{transform: "rotateZ(180deg)"}} className="f-c-col">
                                    <ArrowMiniRightIcon width={17} height={17}/>
                                </div>
                                <div className="sectionTitle grayColor_dark">
                                    Все рестораны
                                </div>
                            </Link>
                        </div>

                        <div className={`${styles.choosenMapWrapper} wrapper w-100p`}>
                            <div className={`of-hide w-100p f-row-betw ${styles.restaurantsSection}`}>
                                <div
                                    className={`${styles.sideWrapper} ${styles.choosenRestaruantBlock} f-column-betw gap-20 pd-20`}>
                                    <div className="top f-column gap-15">
                                        <div className="address f-column">
                                            <h3 className={styles.addressTitle}>{restaurantInfo.adress}</h3>
                                            <p className={styles.addressAreaText}>{""}</p>
                                        </div>
                                        <div className="d-f p-rel">
                                            {
                                                currentSlide > 0 ?
                                                    <div style={{transform: "rotateZ(180deg)"}}
                                                         className={`${styles.sliderArrowWrapper} ${styles.sliderArrowWrapperLeft} d-f jc-end al-center h-100p p-abs left-0`}>
                                                        <div onClick={handlePrev}
                                                             className={`${styles} f-c-col sliderArrowCircle cur-pointer`}>
                                                            <SafeArrowIcon width={7}/>
                                                        </div>

                                                    </div> : null
                                            }

                                            {
                                                currentSlide < restaurantInfo.image.length - 2 ?
                                                    <div onClick={handleNext}
                                                         className={`${styles.sliderArrowWrapper} ${styles.sliderArrowWrapperRight} d-f  jc-end al-center h-100p p-abs right-0`}>
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
                                                    setCurrentSlide(slider.activeIndex)
                                                }}
                                                ref={restaurantImagesSlider}
                                                spaceBetween={20}
                                            >
                                                {
                                                    restaurantInfo.image.map(src => (
                                                        <SwiperSlide key={Date.now()} className={"w-content cur-grabbing"}>
                                                            <div style={{backgroundImage: `url(${domain}/${src})`}}
                                                                 className={`${styles.item} bg-cover`}>

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
                                            <div className={styles.phone}>{"79005001849"}</div>
                                        </div>
                                        <div className={`f-column gap-5 ${styles.workClocks}`}>
                                            <p className={styles.phoneLabel}>График работы</p>
                                            {
                                                weekItems.map((item, index) => (
                                                    index > 0 ? <div key={item.id}
                                                        className={`f-row-betw ${index === dayOfWeek ? "colorRed" : ""}`}>
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
                                    <RedButton disabled={true} className={"pd-10-0"}>Временно недоступно</RedButton>
                                </div>
                                <YMaps>

                                    <ChosenRestaurantMap className={`${styles.map} h-100p f-1`}
                                                         coords={[restaurantInfo.long, restaurantInfo.lat]}
                                                         logoIconSrc={logo}/>
                                </YMaps>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>

    );
};

type ChosenRestaurantMapProps = Pick<RestaurantItemType, "coords"> & {
    logoIconSrc: string
} & HasClassName
const ChosenRestaurantMap: FC<ChosenRestaurantMapProps> = React.memo(({coords, logoIconSrc, className}) => {
    return (
        <Map className={`${className || ""} h-100p w-100p`}
             state={{center: coords, zoom: 13}}>
            <Placemark geometry={coords} options={
                {
                    iconLayout: 'default#image', // Используем стандартный макет изображения
                    iconImageHref: logoIconSrc, // Укажите URL вашей кастомной иконки
                    iconImageSize: [52, 52], // Размер вашей иконки
                    iconImageOffset: [-26, -52],
                }
            }/>
        </Map>
    )
})
export default ChosenRestaurant;