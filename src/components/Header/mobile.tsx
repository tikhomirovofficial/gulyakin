import React from 'react';
import {Link} from "react-router-dom";
import styles from "../../pages/Main/main.module.scss";
import {ArrowMiniDown, ArrowMiniRightIcon, Burger, CartIcon, Geo, Logo, ProfileIcon} from "../../icons";
import RedButton from "../Buttons/RedButton";
import GrayButton from "../Buttons/GrayButton";
import DropdownList, {DropDownItem} from "../DropdownList";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setCurrentCity, toggleAskCityVisible, toggleChangingGeo} from "../../features/main/mainSlice";
import {handleCartOpened, handleLogin} from "../../features/modals/modalsSlice";
import {addToStorage, getFromStorage} from "../../utils/LocalStorageExplorer";
import {formatNumberWithSpaces} from "../../utils/numberWithSpaces";
import useToken from "../../hooks/useToken";
import List from "../List";
import GradientGrayBtn from "../Buttons/GradientGrayButton";


const HeaderMobile = () => {
    return (
        <header className={styles.headerMobile}>
            <div className="wrapper">
                <div className={`${styles.block} pd-20-0 f-row-betw gap-40`}>
                    <div className="left d-f al-center gap-35">
                        <Link to={"/"} className="">
                            <Logo/>
                        </Link>
                        <Link to={"/restaurants"}>
                            <GradientGrayBtn
                                className={`${styles.btnRests} cur-pointer d-f al-center gap-10`}>
                                <Geo/>
                                <p>Рестораны на карте</p>
                            </GradientGrayBtn>
                        </Link>

                    </div>
                    <div className="w-content h-content">
                        <Burger height={30} width={30}/>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default HeaderMobile;