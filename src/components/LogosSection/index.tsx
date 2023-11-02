import React, {FC} from 'react';
import styles from "./logosSection.module.scss";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {marketComponents, MarketItem} from "./markets";
import {setMarket} from "../../features/main/mainSlice";

const LogoItem: FC<Pick<MarketItem, "forMarketId">> = ({forMarketId}) => {
    const dispatch = useAppDispatch()
    const {market} = useAppSelector(state => state.main)
    const getByForId = (forId: number) => {
        return marketComponents.find(item => item.forMarketId === forId) || null
    }

    const gettedMarket = getByForId(forMarketId)

    if (gettedMarket !== null) {
        const isSelected = forMarketId === market
        const ComponentLogo = gettedMarket.ComponentLogo
        const classNameLogo = gettedMarket.className
        const classNameSelected = gettedMarket.selectedClassName
        const handleToMarket = () => {
            dispatch(setMarket(forMarketId))
        }

        return (
            <div onClick={handleToMarket} className={`${classNameLogo} ${isSelected ? classNameSelected : null}`}>
                <ComponentLogo/>
            </div>
        )
    }
    return null

}

const LogosSection = () => {
    const {markets} = useAppSelector(state => state.main)

    const getByForId = (forId: number) => {
        return marketComponents.find(item => item.forMarketId === forId) || null
    }


    return (
        <div className={`pd-40-0 ${styles.section}`}>
            <div className="wrapper w-100p">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={"auto"}
                    className={`${styles.logos}`}>
                    {
                        markets.map(marketItem => (
                            getByForId(marketItem.id) !== null ?
                                <SwiperSlide className={"w-content"}>
                                    <LogoItem forMarketId={marketItem.id}/>
                                </SwiperSlide> : null
                        ))
                    }
                </Swiper>
            </div>

        </div>
    );
};

export default LogosSection;