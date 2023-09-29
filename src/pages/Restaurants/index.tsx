import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import {
    ArrowMiniRightIcon,
    ArrowRight, Cap,
    CartIcon,
    CheckedMark,
    CreatedLogo,
    FoodHallLogo,
    FoodPancakesLogo,
    Geo,
    GulenkiPelmeniLogo,
    GulibuliLogo,
    GustoLogo,
    IFoodLogo,
    Logo,
    ProfileIcon,
    ShrimpLogo,
    VkIcon,
    VorobushekLogo
} from "../../icons";
import styles from './restaurants.module.scss'
import {getImgPath} from "../../utils/getAssetsPath";
import RedButton from "../../components/Buttons/RedButton";
import GrayButton from "../../components/Buttons/GrayButton";
import GrayBorderedBlock from "../../components/GrayBorderedBlock";
import GradientGrayBtn from "../../components/Buttons/GradientGrayButton";
import SearchInput from "../../components/Inputs/SearchInput";
import List from "../../components/List";
import Product from "../../components/Catalog/Product";
import DropdownList from "../../components/DropdownList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

    return (
        <>
            <Header/>
            <div className={`${styles.promo} pd-40-0`}>
                <div className="wrapper">
                    <div className="block f-column gap-30">
                        <div className={`${styles.logos} ${logosIsMax ? "jc-between" : "jc-around"}  d-f gap-20`}>

                            <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                                <FoodHallLogo/>
                            </div>
                            <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                                <GulenkiPelmeniLogo/>
                            </div>
                            <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                                <FoodPancakesLogo/>
                            </div>
                            <div className={`${styles.item} ${styles.neededFill} ${styles.neededIfood} f-c-col `}>
                                <IFoodLogo/>
                            </div>
                            <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                                <VorobushekLogo/>
                            </div>
                            <div className={`${styles.item} ${styles.neededGusto} f-c-col `}>
                                <GustoLogo/>
                            </div>
                            <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                                <ShrimpLogo/>
                            </div>
                            <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                                <GulibuliLogo/>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
            <div className={`${styles.main} f-column gap-20`}>
                <div className="wrapper w-100p">
                    <div className={`${styles.block} f-column gap-25`}>
                        <GradientGrayBtn className={`${styles.backButton} cur-pointer d-f gap-10`}>
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
                                <div className={`${styles.map} h-100p f-1`}></div>
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