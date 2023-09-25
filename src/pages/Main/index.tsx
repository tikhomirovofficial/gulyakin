import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {
    ArrowMiniRightIcon,
    ArrowRight,
    CartIcon,
    CheckedMark, CreatedLogo,
    FoodHallLogo, FoodPancakesLogo, Geo,
    GulenkiPelmeniLogo, GulibuliLogo, GustoLogo, IFoodLogo,
    Logo,
    ProfileIcon, SearchIcon, ShrimpLogo, VkIcon, VorobushekLogo
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
            <div className={`${styles.main} f-column gap-20`}>
                <div className={`pd-30-0`}>
                    <div className="wrapper">
                        <div className={`${styles.block} f-column gap-25`}>
                            <div className={`${styles.restaurants} d-f jc-between gap-30`}>
                                <div className="left d-f gap-30">
                                    <GradientGrayBtn className={`${styles.btn} cur-pointer d-f al-center gap-10`}>
                                        <Geo/>
                                        <p>Рестораны на карте</p>
                                    </GradientGrayBtn>
                                    <SearchInput className={styles.search}/>

                                </div>
                                <div className={`${styles.orderTrigger} f-1  p-rel`}>
                                    <div className="p-abs w-100p h-100p top-0 left-0 d-f jc-center ">
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
                            <div className={`${styles.menuCategories} p-rel  of-x-hide`}>

                                <div className="w-100p">
                                    <div className={`${styles.shadowRight} h-100p p-abs right-0`}>

                                    </div>
                                    <div className="w-100p d-f gap-10">
                                        <GrayBorderedBlock className={styles.item}>Пельмени</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Вареники</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Супы</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Салаты</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Сытные блины</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Сладкие блины</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Картошка</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Креветки и мидии</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Правильные салаты</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Правильные горячие блюда</GrayBorderedBlock>
                                        <GrayBorderedBlock className={styles.item}>Пельмени</GrayBorderedBlock>
                                    </div>

                                </div>


                            </div>
                            <div className={`${styles.oftenOrdered} f-column gap-10`}>
                                <h3>Часто заказывают</h3>
                                <div className={"f-row-betw"}>
                                    <div className={`${styles.item} p-rel d-f jc-end`}>
                                        <div style={{backgroundImage: `url(${getImgPath('pelmeni_often.png')})`}} className={`${styles.bg} bg-cover p-abs h-100p w-100p top-0 left-0`}>

                                        </div>
                                        <div className={`${styles.info} f-column gap-5 p-rel`}>
                                            <h4>Пельмени с говядиной</h4>
                                            <p>от 319 ₽</p>
                                        </div>

                                    </div>
                                    <div className={`${styles.item} p-rel d-f jc-end`}>
                                        <div style={{backgroundImage: `url(${getImgPath('pelmeni_often.png')})`}} className={`${styles.bg} bg-cover p-abs h-100p w-100p top-0 left-0`}>

                                        </div>
                                        <div className={`${styles.info} f-column gap-5 p-rel`}>
                                            <h4>Пельмени с говядиной</h4>
                                            <p>от 319 ₽</p>
                                        </div>

                                    </div>
                                    <div className={`${styles.item} p-rel d-f jc-end`}>
                                        <div style={{backgroundImage: `url(${getImgPath('pelmeni_often.png')})`}} className={`${styles.bg} bg-cover p-abs h-100p w-100p top-0 left-0`}>

                                        </div>
                                        <div className={`${styles.info} f-column gap-5 p-rel`}>
                                            <h4>Пельмени с говядиной</h4>
                                            <p>от 319 ₽</p>
                                        </div>

                                    </div>
                                    <div className={`${styles.item} p-rel d-f jc-end`}>
                                        <div style={{backgroundImage: `url(${getImgPath('pelmeni_often.png')})`}} className={`${styles.bg} bg-cover p-abs h-100p w-100p top-0 left-0`}>

                                        </div>
                                        <div className={`${styles.info} f-column gap-5 p-rel`}>
                                            <h4>Пельмени с говядиной</h4>
                                            <p>от 319 ₽</p>
                                        </div>

                                    </div>
                                    <div className={`${styles.item} p-rel d-f jc-end`}>
                                        <div style={{backgroundImage: `url(${getImgPath('pelmeni_often.png')})`}} className={`${styles.bg} bg-cover p-abs h-100p w-100p top-0 left-0`}>

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
                                            <List listBlockClassname={"jc-between d-f flex-wrap gap-20"} list={Array(8).fill(null)}
                                                  renderItem={() => <Product name={"Пельмени домашние"} composition={"Свинина, говядина"} weight={250} price={350}/>}/>
                                        </div>

                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <footer className={`${styles.footer} pd-40-0`}>
                <div className="wrapper">
                    <div className="block gap-40 f-column">
                        <nav className={"d-f jc-between"}>
                            <div className={`${styles.navColumn} f-column gap-10`}>
                                <Logo className={styles.logo}/>
                                <Link className={styles.navItem} to={"/"}>О нас</Link>
                            </div>
                            <div className={`${styles.navColumn} f-column gap-10`}>
                                <b className={styles.navItem}>Работа</b>
                                <Link className={styles.navItem} to={"/"}>В Гулякин <br/> Фудхолл</Link>
                                <Link className={styles.navItem} to={"/"}>В Гуленьки <br/> Пельменная</Link>
                                <Link className={styles.navItem} to={"/"}>В iFood</Link>
                                <Link className={styles.navItem} to={"/"}>В Воробушек</Link>
                                <Link className={styles.navItem} to={"/"}>В Gusto</Link>
                                <Link className={styles.navItem} to={"/"}>В Креветочная</Link>
                                <Link className={styles.navItem} to={"/"}>В Гулибули</Link>
                            </div>
                            <div className={`${styles.navColumn} f-column gap-10`}>
                                <b className={styles.navItem}>Партнёрам</b>
                                <Link className={styles.navItem} to={"/"}>Инвестиции</Link>
                                <Link className={styles.navItem} to={"/"}>Поставщикам</Link>
                                <Link className={styles.navItem} to={"/"}>Предложить помещение</Link>
                            </div>
                            <div className={`${styles.navColumn} f-column gap-10`}>
                                <b className={styles.navItem}>Документы</b>
                                <Link className={styles.navItem} to={"/"}>Политика конфиденциальности</Link>
                                <Link className={styles.navItem} to={"/"}>Пользовательское соглашение</Link>
                                <Link className={styles.navItem} to={"/"}>Соглашение на обработку ПД</Link>
                                <Link className={styles.navItem} to={"/"}>Правила программы лояльности</Link>
                            </div>
                            <div className={`${styles.navColumn} f-column gap-10`}>
                                <b className={styles.navItem}>Контакты</b>
                                <a className={styles.navItem} href="">mail@mail.ru</a>
                                <a className={styles.navItem} href="">+7 (495) 345-64-54</a>
                                <div className={`${styles.socials} d-f gap-10`}>
                                    <a href="" className={`${styles.item} f-c-col`}>
                                        <VkIcon/>
                                    </a>
                                    <a href="" className={`${styles.item} f-c-col`}>
                                        <VkIcon/>
                                    </a>
                                    <a href="" className={`${styles.item} f-c-col`}>
                                        <VkIcon/>
                                    </a>
                                </div>
                            </div>
                        </nav>
                        <div className="f-row-betw">
                            <div className={styles.copyright}>
                                <p>© 2023 ООО «Гулякин»</p>
                                <p>ОГРН 1234567899116, ИНН 3589065840</p>
                                <p> 162606, Ханты-Мансийский автономный округ, г. Сургут, ул. Энергетиков, д. 4</p>
                            </div>
                            <div className={styles.created}>
                                <p>Создание сайта</p>
                                <CreatedLogo/>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>

    );
};

export default Main;