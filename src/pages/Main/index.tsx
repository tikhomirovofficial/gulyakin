import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {
    ArrowMiniRightIcon,
    ArrowRight,
    CartIcon,
    CheckedMark,
    FoodHallLogo, FoodPancakesLogo, Geo,
    GulenkiPelmeniLogo, GulibuliLogo, GustoLogo, IFoodLogo,
    Logo,
    ProfileIcon, ShrimpLogo, VorobushekLogo
} from "../../icons";
import styles from './main.module.scss'
import {getImgPath} from "../../utils/getAssetsPath";
import RedButton from "../../components/Buttons/RedButton";
import GrayButton from "../../components/Buttons/GrayButton";
import GrayBorderedBlock from "../../components/GrayBorderedBlock";

const logosIsMax = true
const cityIsDefined = true
const changingGeo = false

const Main: FC = () => {

    return (
        <>
            <header className={styles.header}>
                <div className="wrapper">
                    <div className="block pd-30-0 f-row-betw gap-50">
                        <div className="left d-f al-center gap-35">
                            <Link to={"/"} className="">
                                <Logo/>
                            </Link>
                            <div className={`${styles.logoText} p-rel f-column gap-5`}>
                                <p>Доставка готовый еды</p>
                                <div className={`d-f al-center gap-10`}>
                                    <p>в городе</p>
                                    <div className={`${styles.city} d-f al-center gap-5 cur-pointer`}>
                                        <b>Сургут</b>
                                        <ArrowMiniRightIcon height={11}/>
                                    </div>
                                    {
                                        !cityIsDefined ? <div className={`${styles.geoPopup} ${styles.yourCity} f-column gap-15 p-abs bg-white`}>
                                            <b className={"txt-center"}>Это ваш город?</b>
                                            <div className="d-f gap-5 jc-around">
                                                <RedButton className={styles.btn}>Да</RedButton>
                                                <GrayButton className={styles.btn}>Другой</GrayButton>
                                            </div>

                                        </div> : null
                                    }
                                    {
                                        changingGeo ? <div className={`${styles.selectCity}  ${styles.geoPopup} f-column gap-15 p-abs bg-white`}>
                                            <div className={`${styles.item} ${styles.checkedItem} f-row-betw`}>
                                                <p>Сургут</p>
                                                <CheckedMark height={11} width={11}/>
                                            </div>
                                            <div className={`${styles.item} f-row-betw`}>
                                                <p>Сочи</p>
                                            </div>
                                            <div className={`${styles.item} f-row-betw`}>
                                                <p>Нижневартовск</p>
                                            </div>
                                        </div>  : null
                                    }


                                </div>

                            </div>
                        </div>

                        <nav className={"d-f gap-20"}>
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
                        <div className={`${styles.right} d-f al-center gap-20`}>
                            <div className={`${styles.profileBtn} btn d-f al-center gap-5 cur-pointer`}>
                                <ProfileIcon height={22} width={16}/>
                                <b>
                                    Кабинет
                                </b>
                            </div>
                            <div
                                className={`${styles.cartBtnFilled} ${styles.cartBtn} btn d-f gap-5 al-center cur-pointer`}>
                                <CartIcon height={22} width={22}/>
                                <b>
                                    4300 ₽
                                </b>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className={`${styles.promo} pd-40-0`}>
                <div className="wrapper">
                    <div className="block f-column gap-30">
                        <div className={`${styles.logos} ${logosIsMax ? "jc-between" : "jc-around"}  d-f gap-20`}>

                            <div className={`${styles.item} f-c-col `}>
                                <FoodHallLogo/>
                            </div>
                            <div className={`${styles.item} f-c-col `}>
                                <GulenkiPelmeniLogo/>
                            </div>
                            <div className={`${styles.item} f-c-col `}>
                                <FoodPancakesLogo/>
                            </div>
                            <div className={`${styles.item} f-c-col `}>
                                <IFoodLogo/>
                            </div>
                            <div className={`${styles.item} f-c-col `}>
                                <VorobushekLogo/>
                            </div>
                            <div className={`${styles.item} f-c-col `}>
                                <GustoLogo/>
                            </div>
                            <div className={`${styles.item} f-c-col `}>
                                <ShrimpLogo/>
                            </div>
                            <div className={`${styles.item} f-c-col `}>
                                <GulibuliLogo/>
                            </div>

                        </div>
                        <div className={`${styles.promos} w-100p p-rel`}>
                            <div className={`${styles.container} w-100 f-row-betw`}>
                                <Link to={"/"} className={styles.item}>
                                    <div style={{backgroundImage: `url(${getImgPath("promo.jpg")})`}} className={`${styles.image} w-100p bg-cover`}></div>
                                    <div className={`${styles.info} f-column gap-5 pd-20`}>
                                        <div className="f-row-betw">
                                            <h3>Акция №1</h3>
                                            <ArrowRight/>
                                        </div>
                                        <p>Мы открылись, приходите к нам по адресу</p>

                                    </div>
                                </Link>
                                <Link to={"/"} className={styles.item}>
                                    <div style={{backgroundImage: `url(${getImgPath("promo.jpg")})`}} className={`${styles.image} w-100p bg-cover`}></div>
                                    <div className={`${styles.info} f-column gap-5 pd-20`}>
                                        <div className="f-row-betw">
                                            <h3>Акция №2</h3>
                                            <ArrowRight/>
                                        </div>
                                        <p>Мы открылись, приходите к нам по адресу</p>

                                    </div>
                                </Link>
                                <Link to={"/"} className={styles.item}>
                                    <div style={{backgroundImage: `url(${getImgPath("promo.jpg")})`}} className={`${styles.image} w-100p bg-cover`}></div>
                                    <div className={`${styles.info} f-column gap-5 pd-20`}>
                                        <div className="f-row-betw">
                                            <h3>Акция №3</h3>
                                            <ArrowRight/>
                                        </div>
                                        <p>Мы открылись, приходите к нам по адресу</p>

                                    </div>
                                </Link>
                                <Link to={"/"} className={styles.item}>
                                    <div style={{backgroundImage: `url(${getImgPath("promo.jpg")})`}} className={`${styles.image} w-100p bg-cover`}></div>
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
            <div className={`${styles.middleBar} pd-30-0`}>
                <div className="wrapper">
                    <div className={`${styles.block} f-column gap-30`}>
                        <div className={styles.restaurants}>
                            <div className="left d-f gap-30">
                                <div className={`${styles.btn} cur-pointer d-f al-center gap-10`}>
                                    <Geo/>
                                    <p>Рестораны на карте</p>
                                </div>

                                <GrayBorderedBlock className={`${styles.search} f-row-betw`}>

                                </GrayBorderedBlock>
                            </div>
                            <div className="right">

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
};

export default Main;