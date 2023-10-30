import React, {FC} from 'react';
import {Cap} from "../../icons";
import styles from './restaurants.module.scss'
import GradientGrayBtn from "../../components/Buttons/GradientGrayButton";
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RestaurantItemType} from "../../types/restaurants.types";
import {Link} from "react-router-dom";

const logosIsMax = true

type RestaurantItemProps = {
    link: string
} & Pick<RestaurantItemType, "cityArea" | "canOnlineOrder" | "street">
const RestaurantItem: FC<RestaurantItemProps> = ({cityArea, street, link, canOnlineOrder}) => {
    return (
        <Link to={link} className={styles.itemWrapper}>
            <div className={styles.item}>
                <div className={"f-column gap-10"}>
                    <div className="f-column f-1 gap-5">
                        <b>{street}</b>
                        <p>{cityArea}</p>
                    </div>

                    <div className={`${!canOnlineOrder && "hidden"} ${styles.bottomText}`}>
                        Доступно онлайн бронирование столика
                    </div>
                </div>
            </div>
        </Link>
    )
}

const Restaurants: FC = () => {
    const dispatch = useAppDispatch()
    const restaurant = useAppSelector(state => state.restaurants.list.filter(item => item.id === 1)[0])


    return (
        <>
            <div className={`${styles.main} f-column gap-20`}>
                <div className={`${styles.restaurantsMap} w-100p`}>
                    <div className={`${styles.block} f-column gap-25`}>
                        <div className="wrapper d-f jc-start w-100p">
                            <Link to={"/"}>
                                <GradientGrayBtn className={`${styles.backButton} cur-pointer d-f gap-10`}>
                                    <Cap/>
                                    <p>Вернуться в меню</p>
                                </GradientGrayBtn>
                            </Link>
                        </div>

                        <div className="f-column gap-20">
                            <div className="wrapper w-100p">
                                <div className="sectionTitle">
                                    {restaurant.branches.length} кафе Гулякин в Сургуте
                                </div>
                            </div>
                            <div className={`${styles.restContainer} wrapper w-100p`}>
                                <div className={`of-hide w-100p  f-row-betw ${styles.restaurantsSection}`}>
                                    <div className={`${styles.restaurantsContainer} f-column h-100p`}>
                                        <div className={`${styles.sideWrapper} f-column wrapper`}>
                                            {
                                                restaurant.branches.map(item => (
                                                    <RestaurantItem link={"/restaurants/1"} street={item.street}
                                                                    canOnlineOrder={item.canOnlineOrder}
                                                                    cityArea={item.cityArea}/>
                                                ))
                                            }
                                        </div>
                                    </div>


                                    <div className={`${styles.map} h-100p f-1`}>
                                        <YMaps>
                                            <Map className={`${styles.mapContainer} h-100p w-100p`}
                                                 state={{center: restaurant.branches[0].coords, zoom: 9}}>
                                                {
                                                    restaurant.branches.map(item => (
                                                        <Placemark geometry={item.coords} options={
                                                            {
                                                                iconLayout: 'default#image', // Используем стандартный макет изображения
                                                                iconImageHref: restaurant.logoIconSrc, // Укажите URL вашей кастомной иконки
                                                                iconImageSize: [52, 52], // Размер вашей иконки
                                                                iconImageOffset: [0, 0],
                                                            }
                                                        }/>
                                                    ))
                                                }

                                            </Map>

                                        </YMaps>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>

    );
};

export default Restaurants;