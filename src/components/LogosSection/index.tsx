import React, {FC} from 'react';
import styles from "./logosSection.module.scss";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {marketComponents, MarketItem} from "./markets";
import {setMarket} from "../../features/main/mainSlice";
import {resetOrderForm} from "../../utils/common/resetOrderForm";
import {setOrderForm} from "../../features/forms/formsSlice";

type LogoItemProps = {
    id: number
} & Pick<MarketItem, "forMarketId">
const LogoItem: FC<LogoItemProps> = ({forMarketId, id}) => {
    const dispatch = useAppDispatch()
    const {market, cityMarkets} = useAppSelector(state => state.main)
    const {restaurant} = useAppSelector(state => state.forms.orderForm)
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
            dispatch(setMarket(id))
            // if(restaurant === -1) {
            //     resetOrderForm()
            //     dispatch(setOrderForm({
            //         address: "", restaurant: -1,
            //         addressId: -1
            //     }))
            // }
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
    const {markets, cityMarkets} = useAppSelector(state => state.main)

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
                        cityMarkets.map(marketItem => (
                            getByForId(marketItem.link) !== null ?
                                <SwiperSlide className={"w-content"}>
                                    <LogoItem key={marketItem.id} id={marketItem.id} forMarketId={marketItem.link}/>
                                </SwiperSlide> : null
                        ))
                    }
                </Swiper>
            </div>

        </div>
    );
};

export default LogosSection;