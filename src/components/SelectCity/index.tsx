import React, {FC} from 'react';
import styles from "./selectCity.module.scss";
import {ArrowMiniDown, ArrowMiniRightIcon} from "../../icons";
import RedButton from "../Buttons/RedButton";
import GrayButton from "../Buttons/GrayButton";
import List from "../List";
import {DropDownItem} from "../DropdownList";
import {setCurrentCity, toggleAskCityVisible, toggleChangingGeo} from "../../features/main/mainSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {addToStorage} from "../../utils/LocalStorageExplorer";
import {HasClassName} from "../../types/components.types";
import {setOrderForm} from "../../features/forms/formsSlice";
import {resetOrderForm} from "../../utils/common/resetOrderForm";

type SelectCityProps = {
    classNamePopup?: string,
    askGeoPopupClass?: string
}
const SelectCity: FC<HasClassName & SelectCityProps> = ({className, askGeoPopupClass, classNamePopup}) => {
    const dispatch = useAppDispatch()
    const {cities, currentGeo, changingGeo, askCityVisible} = useAppSelector(state => state.main)
    const handleChangingGeo = () => dispatch(toggleChangingGeo())
    const handleAskCity = () => {
        dispatch(toggleAskCityVisible())
        addToStorage("city_accepted", currentGeo.city)
    }

    const handleNotYourCity = () => {
        handleChangingGeo()
        dispatch(toggleAskCityVisible())
    }
    return (
        <div className={`${styles.logoText} ${className || ""} p-rel f-column gap-5`}>
            <p>Доставка готовый еды</p>
            <div className={`d-f al-center gap-10`}>
                <p>в городе</p>
                <div onClick={handleChangingGeo}
                     className={`${styles.city} d-f al-center gap-5 cur-pointer`}>
                    <b>{
                        cities.length > 0 ?
                            !currentGeo.city ?
                                cities[0].name :
                                cities.filter(item => item.id === currentGeo.city)[0]?.name
                            : "..."
                    }</b>
                    {
                        !changingGeo ? <ArrowMiniRightIcon height={11}/> : <ArrowMiniDown height={10}/>
                    }

                </div>
                {
                    askCityVisible ? <div
                        className={`${styles.geoPopup} ${styles.yourCity} ${askGeoPopupClass || ""} f-column gap-15 p-abs bg-white`}>
                        <b className={"txt-center"}>Это ваш город?</b>
                        <div className="d-f gap-5 jc-around">
                            <RedButton onClick={handleAskCity} className={styles.btn}>Да</RedButton>
                            <GrayButton onClick={handleNotYourCity}
                                        className={styles.btn}>Другой</GrayButton>
                        </div>

                    </div> : null
                }
                {
                    changingGeo ?
                        <List
                            listBlockClassname={`${styles.geoPopup} ${classNamePopup} f-column gap-15 p-abs bg-white `}
                            list={cities}
                            renderItem={(item) =>
                                <DropDownItem key={item.id}
                                              selectHandler={() =>  {
                                                  dispatch(setOrderForm({
                                                      address: "", restaurant: -1,
                                                      addressId: -1
                                                  }))
                                                  resetOrderForm()
                                                  dispatch(setCurrentCity(item.id))
                                                  handleChangingGeo()
                                              }}
                                              className={`${styles.selectCityItem} f-row-betw`}
                                              text={item.name} isCurrent={item.id === currentGeo.city}
                                />
                            }/>
                        : null
                }


            </div>

        </div>
    );
};

export default SelectCity;