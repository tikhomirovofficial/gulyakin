import React from 'react';
import styles from "./logosSection.module.scss";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {
    FoodHallLogo,
    FoodPancakesLogo,
    GulenkiPelmeniLogo,
    GulibuliLogo,
    GustoLogo,
    IFoodLogo,
    ShrimpLogo,
    VorobushekLogo
} from "../../icons";

const logosIsMax = true
const LogosSection = () => {

    return (
        <div className={`pd-40-0 ${styles.section}`}>
            <div className="wrapper w-100p">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={"auto"}
                    className={`${styles.logos}`}>
                    <SwiperSlide className={"w-content"}>
                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <FoodHallLogo/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={"w-content"} >
                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <GulenkiPelmeniLogo/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={"w-content"}>
                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <FoodPancakesLogo/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={"w-content"}>
                        <div className={`${styles.item} ${styles.neededFill} ${styles.neededIfood} f-c-col `}>
                            <IFoodLogo/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={"w-content"}>

                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <VorobushekLogo/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={"w-content"}>

                        <div className={`${styles.item} ${styles.neededGusto} f-c-col `}>
                            <GustoLogo/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={"w-content"}>
                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <ShrimpLogo/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={"w-content"}>
                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <GulibuliLogo/>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
    );
};

export default LogosSection;