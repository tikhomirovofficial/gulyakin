 import React, {FC, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {ArrowMiniRightIcon, ArrowRight, Geo} from "../../icons";
import styles from './main.module.scss'
import {getImgPath} from "../../utils/getAssetsPath";
import GrayBorderedBlock from "../../components/GrayBorderedBlock";
import GradientGrayBtn from "../../components/Buttons/GradientGrayButton";
import SearchInput from "../../components/Inputs/SearchInput";
import List from "../../components/List";
import Product from "../../components/Catalog/Product";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogosSection from "../../components/LogosSection";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setTempPage} from "../../features/main/mainSlice";
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import 'swiper/css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import {handleBooking} from "../../features/modals/modalsSlice";
 import {getUser} from "../../features/profile/profileSlice";
 import useAuth from "../../hooks/useAuth";
 import useToken from "../../hooks/useToken";

const Main: FC = () => {
    const {categories, products} = useAppSelector(state => state)
    const is_auth = useAuth()
    const token = useToken()

    const dispatch = useAppDispatch()
    const sliderCategories = useRef<SwiperProps>(null)

    const [sliderNeeded, setSliderNeeded] = useState(false)
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [isEndSlider, setIsEndSlider] = useState(false)

    const handleNext = () => {
        sliderCategories.current.swiper.slideNext();
    }

    const handlePrev = () => {
        sliderCategories.current.swiper.slidePrev();
    }


    useEffect(() => {
        if(sliderCategories.current) {
            const slider = sliderCategories.current as HTMLDivElement
            const parentWidth = slider.parentElement?.parentElement?.offsetWidth

            if(parentWidth) {
                const sliderIsSmaller = slider.offsetWidth < parentWidth
                if(!sliderIsSmaller) {
                    setSliderNeeded(true)
                }
            }


        }
    }, [categories])

    useEffect(() => {
        if(token && !is_auth) {
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
                                    <GradientGrayBtn onClick={() => dispatch(setTempPage(1))}
                                                     className={`${styles.btn} cur-pointer d-f al-center gap-10`}>
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

                                    <div onClick={() => dispatch(handleBooking())} className="w-100p f-c-row p-rel h-100p">
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
                                        sliderNeeded && currentSlide > 0 ?  <div style={{transform: "rotateZ(180deg)"}} className={`${styles.shadowRight} d-f jc-end al-center h-100p p-abs left-0`}>
                                            <div onClick={handlePrev} className="miniSliderArrow cur-pointer f-c-col">
                                                <ArrowMiniRightIcon width={14} height={14}/>
                                            </div>

                                        </div> : null

                                    }
                                    {
                                        sliderNeeded && !isEndSlider ?  <div className={`${styles.shadowRight} d-f jc-end al-center h-100p p-abs right-0`}>
                                            <div onClick={handleNext} className="miniSliderArrow cur-pointer f-c-col">
                                                <ArrowMiniRightIcon width={14} height={14}/>
                                            </div>

                                        </div> : null
                                    }


                                    <div className="w-100p d-f gap-10 of-y-hide scrollbar-unset">


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
                                                categories.items.map(item => (
                                                    <SwiperSlide key={item.id} className={"w-content cur-grabbing"}>
                                                        <GrayBorderedBlock clickHandler={() => console.log(`Реализовать скролл до ${item.id}`)} className={styles.item}>
                                                            {item.title}
                                                        </GrayBorderedBlock>
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>

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
                                    {
                                        categories.items.map(category => (
                                            <div className={`${styles.categoryBlock} f-column gap-20`}>
                                                <h2 className="sectionTitle">{category.title}</h2>
                                                <List listBlockClassname={`${styles.catalogPartList} d-f flex-wrap gap-20`}
                                                      list={products.items.filter(product => product.category === category.id)}
                                                      renderItem={(product) =>
                                                          <Product name={product.title}
                                                                   id={product.id}
                                                                   count={0}
                                                                   composition={product.composition}
                                                                   weight={product.weight}
                                                                   price={product.price}/>
                                                }/>
                                            </div>
                                        ))
                                    }


                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </>

    );
};

export default Main;