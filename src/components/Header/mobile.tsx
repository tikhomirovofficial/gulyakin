import React from 'react';
import {Link} from "react-router-dom";
import styles from "../../pages/Main/main.module.scss";
import {Burger, Geo, Logo} from "../../icons";
import {useAppDispatch} from "../../app/hooks";
import {setMobileMenu} from "../../features/modals/modalsSlice";
import GradientGrayBtn from "../Buttons/GradientGrayButton";


const HeaderMobile = () => {
    const dispatch = useAppDispatch()
    const handleOpen = () => {
        dispatch(setMobileMenu(true))
    }
    return (
        <header className={styles.headerMobile}>
            <div className="wrapper">
                <div className={`${styles.block} pd-20-0 f-row-betw gap-40`}>
                    <div className={`${styles.left} d-f al-center gap-35`}>
                        <Link to={"/"} className="">
                            <Logo fill={"#fff"}/>
                        </Link>
                        <Link to={"/restaurants"}>
                            <GradientGrayBtn
                                className={`${styles.btnRests} cur-pointer d-f al-center gap-10`}>
                                <Geo/>
                                <p>Рестораны на карте</p>
                            </GradientGrayBtn>
                        </Link>

                    </div>
                    <div onClick={handleOpen} className="w-content h-content">
                        <Burger height={30} width={30}/>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default HeaderMobile;