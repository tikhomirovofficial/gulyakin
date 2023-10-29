import React, {FC, useDeferredValue, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {ArrowMiniRightIcon, ArrowRight, Geo} from "../../icons";
import styles from './main.module.scss'
import {getImgPath} from "../../utils/getAssetsPath";
import GrayBorderedBlock from "../../components/GrayBorderedBlock";
import GradientGrayBtn from "../../components/Buttons/GradientGrayButton";
import SearchInput from "../../components/Inputs/SearchInput";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {handleBooking} from "../../features/modals/modalsSlice";
import {getUser} from "../../features/profile/profileSlice";
import useAuth from "../../hooks/useAuth";
import useToken from "../../hooks/useToken";
import Preloader from "../../components/Preloader";
import {useInput} from "../../hooks/useInput";
import Catalog from "../../components/Catalog";

const Main: FC = () => {
    const {categories, products, cart} = useAppSelector(state => state)
    const is_auth = useAuth()
    const token = useToken()

    const dispatch = useAppDispatch()
    const sliderCategories = useRef<SwiperProps>(null)

    const [sliderNeeded, setSliderNeeded] = useState(false)
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [isEndSlider, setIsEndSlider] = useState(false)

    const [searchVal, changeSearchVal, setSearchVal] = useInput("")
    const deferredSearch = useDeferredValue(searchVal)

    const handleNext = () => {
        sliderCategories.current.swiper.slideNext();
    }

    const handlePrev = () => {
        sliderCategories.current.swiper.slidePrev();
    }


    useEffect(() => {
        if (sliderCategories.current) {
            const slider = sliderCategories.current as HTMLDivElement
            const parentWidth = slider.parentElement?.parentElement?.offsetWidth

            if (parentWidth) {
                const sliderIsSmaller = slider.offsetWidth < parentWidth
                if (!sliderIsSmaller) {
                    setSliderNeeded(true)
                }
            }


        }
    }, [categories])

    useEffect(() => {
        if (token && !is_auth) {
            dispatch(getUser())
        }
    }, [])
    return (
        <>
            <div className={`${styles.promo} d-n`}>
                <div className="wrapper">
                    <div className="block f-column">
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
                                    <Link to={"/restaurants"}>
                                        <GradientGrayBtn
                                            className={`${styles.btn} cur-pointer d-f al-center gap-10`}>
                                            <Geo/>
                                            <p>Рестораны на карте</p>
                                        </GradientGrayBtn>
                                    </Link>
                                    <SearchInput
                                        value={searchVal}
                                        changeVal={changeSearchVal}
                                        setVal={setSearchVal}
                                        className={styles.search}/>
                                </div>
                                <div className={`${styles.orderTrigger} f-1  p-rel`}>
                                    <div className="p-abs w-100p h-100p top-0 left-0 d-f jc-center">
                                        <div className={`${styles.backgrounds} p-rel f-row-betw h-100p`}>
                                            <img className={"h-100p"} src={getImgPath("pelmeni.png")} alt=""/>
                                            <img className={"h-100p"} src={getImgPath("vilki.png")} alt=""/>
                                        </div>
                                    </div>

                                    <div onClick={() => dispatch(handleBooking())}
                                         className="w-100p f-c-row p-rel h-100p">
                                        <div className={`${styles.text} f-column`}>
                                            <p>Забронируйте</p>
                                            <p>у нас столик!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.menuCategories}`}>
                            <div className="wrapper ">

                                <div className="w-100p p-rel">
                                    {
                                        sliderNeeded && currentSlide > 0 ? <div style={{transform: "rotateZ(180deg)"}}
                                                                                className={`${styles.shadowRight} d-f jc-end al-center h-100p p-abs left-0`}>
                                            <div onClick={handlePrev} className="miniSliderArrow cur-pointer f-c-col">
                                                <ArrowMiniRightIcon width={14} height={14}/>
                                            </div>

                                        </div> : null

                                    }
                                    {
                                        sliderNeeded && !isEndSlider ? <div
                                            className={`${styles.shadowRight} d-f jc-end al-center h-100p p-abs right-0`}>
                                            <div onClick={handleNext} className="miniSliderArrow cur-pointer f-c-col">
                                                <ArrowMiniRightIcon width={14} height={14}/>
                                            </div>

                                        </div> : null
                                    }


                                    <div className="w-100p d-f gap-10 of-y-hide scrollbar-unset">
                                        {
                                            categories.category.length > 0 ?
                                                <Swiper
                                                    onActiveIndexChange={(slider: SwiperProps) => {
                                                        setIsEndSlider(slider.isEnd)
                                                        setCurrentSlide(slider.activeIndex)
                                                    }}

                                                    style={{margin: 0}}
                                                    slidesPerView={'auto'}
                                                    centeredSlides={false}
                                                    className={""}
                                                    ref={sliderCategories}
                                                    spaceBetween={10}
                                                >
                                                    {
                                                        categories.category.map(item => (
                                                            <SwiperSlide key={item.id}
                                                                         className={"w-content cur-grabbing"}>
                                                                <a href={`/#${item.id}`}>
                                                                    <GrayBorderedBlock
                                                                        clickHandler={() => console.log(`Реализовать скролл до ${item.id}`)}
                                                                        className={styles.item}>
                                                                        {item.title}
                                                                    </GrayBorderedBlock>
                                                                </a>

                                                            </SwiperSlide>
                                                        ))
                                                    }
                                                </Swiper> :

                                                <div className="f-c-col infiniteSpin w-content h-content">
                                                    <Preloader height={20} width={20}/>
                                                </div>

                                        }


                                    </div>


                                </div>
                            </div>


                        </div>
                        <div className="wrapper f-column gap-30 w-100p">
                            <div className={`${styles.oftenOrdered} f-column gap-10`}>
                                <h3>Комбо</h3>
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
                                {
                                    deferredSearch.length > 0 ?
                                        <div className={styles.searchedQuery}>Поиск по запросу: {deferredSearch}</div>
                                        : null
                                }

                                <Catalog search={deferredSearch}/>

                            </div>


                        </div>

                    </div>
                </div>

            </div>

        </>

    );
};

export default Main;