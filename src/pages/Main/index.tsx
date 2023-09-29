import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import {
    ArrowMiniRightIcon,
    ArrowRight,
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
import styles from './main.module.scss'
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


const cities = ["Сургут", "Сочи", "Нижневартовск"]
const Main: FC = () => {

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
                        <div className={`${styles.promos} w-100p p-rel`}>
                            <div className={`${styles.container} w-100 f-row-betw`}>
                                <Link to={"/"} className={styles.item}>
                                    <div style={{backgroundImage: `url(${getImgPath("promo.jpg")})`}}
                                         className={`${styles.image} w-100p bg-cover`}></div>
                                    <div className={`${styles.info} f-column gap-5 pd-20`}>
                                        <div className="f-row-betw">
                                            <h3>Акция №1</h3>
                                            <ArrowRight/>
                                        </div>
                                        <p>Мы открылись, приходите к нам по адресу</p>

                                    </div>
                                </Link>
                                <Link to={"/"} className={styles.item}>
                                    <div style={{backgroundImage: `url(${getImgPath("promo.jpg")})`}}
                                         className={`${styles.image} w-100p bg-cover`}></div>
                                    <div className={`${styles.info} f-column gap-5 pd-20`}>
                                        <div className="f-row-betw">
                                            <h3>Акция №2</h3>
                                            <ArrowRight/>
                                        </div>
                                        <p>Мы открылись, приходите к нам по адресу</p>

                                    </div>
                                </Link>
                                <Link to={"/"} className={styles.item}>
                                    <div style={{backgroundImage: `url(${getImgPath("promo.jpg")})`}}
                                         className={`${styles.image} w-100p bg-cover`}></div>
                                    <div className={`${styles.info} f-column gap-5 pd-20`}>
                                        <div className="f-row-betw">
                                            <h3>Акция №3</h3>
                                            <ArrowRight/>
                                        </div>
                                        <p>Мы открылись, приходите к нам по адресу</p>

                                    </div>
                                </Link>
                                <Link to={"/"} className={styles.item}>
                                    <div style={{backgroundImage: `url(${getImgPath("promo.jpg")})`}}
                                         className={`${styles.image} w-100p bg-cover`}></div>
                                    <div className={`${styles.info} f-column gap-5 pd-20`}>
                                        <div className="f-row-betw">
                                            <h3>Акция №4</h3>
                                            <ArrowRight/>
                                        </div>
                                        <p>Мы открылись, приходите к нам по адресу</p>

                                    </div>
                                </Link>
                            </div>
                            <div
                                className={`${styles.arrowWrapper} promosArrowWrapper h-100p f-c-col p-abs right-0 top-0`}>
                                <div className={styles.arrow}>

                                </div>
                            </div>
                            <div
                                className={`${styles.arrowWrapper} promosArrowWrapper h-100p f-c-col p-abs left-0 top-0`}>
                                <div className={styles.arrow}>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className={`${styles.main} f-column gap-20`}>
                <div className={`pd-30-0`}>
                    <div className={`${styles.block} f-column gap-25`}>
                        <div className="wrapper w-100p">
                            <div className={`${styles.restaurants} d-f jc-between gap-30`}>
                                <div className="left d-f gap-30">
                                    <GradientGrayBtn className={`${styles.btn} cur-pointer d-f al-center gap-10`}>
                                        <Geo/>
                                        <p>Рестораны на карте</p>
                                    </GradientGrayBtn>
                                    <SearchInput className={styles.search}/>

                                </div>
                                <div className={`${styles.orderTrigger} f-1  p-rel`}>
                                    <div className="p-abs w-100p h-100p top-0 left-0 d-f jc-center">
                                        <div className={`${styles.backgrounds} p-rel f-row-betw h-100p`}>
                                            <img className={"h-100p"} src={getImgPath("pelmeni.png")} alt=""/>
                                            <img className={"h-100p"} src={getImgPath("vilki.png")} alt=""/>
                                        </div>
                                    </div>

                                    <div className="w-100p f-c-row p-rel h-100p">
                                        <div className={`${styles.text} f-column`}>
                                            <p>Забронируйте</p>
                                            <p>у нас столик!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.menuCategories}`}>
                            <div className="wrapper p-rel">
                                <div className={`${styles.shadowRight} h-100p p-abs right-0`}>

                                </div>
                                <div className="w-100p">
                                    <div className="w-100p d-f gap-10 of-y-hide scrollbar-unset">
                                        <GrayBorderedBlock className={styles.item}>Пельмени</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Вареники</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Супы</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Салаты</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Сытные блины</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Сладкие блины</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Картошка</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Креветки и мидии</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Правильные салаты</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Правильные горячие
                                            блюда</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Пельмени</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Пельмени</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Пельмени</GrayBorderedBlock>
                                    </div>

                                </div>
                            </div>


                        </div>
                        <div className="wrapper f-column gap-30 w-100p">
                            <div className={`${styles.oftenOrdered} f-column gap-10`}>
                                <h3>Часто заказывают</h3>
                                <div className={"f-row-betw"}>
                                    <div className={`${styles.item} p-rel d-f jc-end`}>
                                        <div style={{backgroundImage: `url(${getImgPath('pelmeni_often.png')})`}}
                                             className={`${styles.bg} bg-cover p-abs h-100p w-100p top-0 left-0`}>

                                        </div>
                                        <div className={`${styles.info} f-column gap-5 p-rel`}>
                                            <h4>Пельмени с говядиной</h4>
                                            <p>от 319 ₽</p>
                                        </div>

                                    </div>
                                    <div className={`${styles.item} p-rel d-f jc-end`}>
                                        <div style={{backgroundImage: `url(${getImgPath('pelmeni_often.png')})`}}
                                             className={`${styles.bg} bg-cover p-abs h-100p w-100p top-0 left-0`}>

                                        </div>
                                        <div className={`${styles.info} f-column gap-5 p-rel`}>
                                            <h4>Пельмени с говядиной</h4>
                                            <p>от 319 ₽</p>
                                        </div>

                                    </div>
                                    <div className={`${styles.item} p-rel d-f jc-end`}>
                                        <div style={{backgroundImage: `url(${getImgPath('pelmeni_often.png')})`}}
                                             className={`${styles.bg} bg-cover p-abs h-100p w-100p top-0 left-0`}>

                                        </div>
                                        <div className={`${styles.info} f-column gap-5 p-rel`}>
                                            <h4>Пельмени с говядиной</h4>
                                            <p>от 319 ₽</p>
                                        </div>

                                    </div>
                                    <div className={`${styles.item} p-rel d-f jc-end`}>
                                        <div style={{backgroundImage: `url(${getImgPath('pelmeni_often.png')})`}}
                                             className={`${styles.bg} bg-cover p-abs h-100p w-100p top-0 left-0`}>

                                        </div>
                                        <div className={`${styles.info} f-column gap-5 p-rel`}>
                                            <h4>Пельмени с говядиной</h4>
                                            <p>от 319 ₽</p>
                                        </div>

                                    </div>
                                    <div className={`${styles.item} p-rel d-f jc-end`}>
                                        <div style={{backgroundImage: `url(${getImgPath('pelmeni_often.png')})`}}
                                             className={`${styles.bg} bg-cover p-abs h-100p w-100p top-0 left-0`}>

                                        </div>
                                        <div className={`${styles.info} f-column gap-5 p-rel`}>
                                            <h4>Пельмени с говядиной</h4>
                                            <p>от 319 ₽</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={styles.catalog}>
                                <div className="block f-column gap-40">
                                    <div className={`${styles.categoryBlock} f-column gap-20`}>
                                        <h2 className="sectionTitle">Пельмени</h2>
                                        <List listBlockClassname={"jc-between d-f flex-wrap gap-20"}
                                              list={Array(8).fill(null)}
                                              renderItem={() => <Product name={"Пельмени домашние"}
                                                                         composition={"Свинина, говядина"} weight={250}
                                                                         price={350}/>}/>
                                    </div>

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

export default Main;