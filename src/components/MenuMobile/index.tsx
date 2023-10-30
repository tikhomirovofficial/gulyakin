import React from 'react';
import styles from './menuMobile.module.scss'
import {Logo, MiniClose, ThinClose, VkIcon} from "../../icons";
import SelectCity from "../SelectCity";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setMobileMenu} from "../../features/modals/modalsSlice";

const MenuMobile = () => {
    const dispatch = useAppDispatch()
    const {mobileMenu} = useAppSelector(state => state.modals)
    const handleClose = () => {
        dispatch(setMobileMenu(false))
    }
    return (
        <div className={`${styles.menu} ${mobileMenu ? styles.menuOpened : ""} f-column p-fix top-0 left-0 h-100v w-100v t-transform-4`}>
            <div className={`${styles.header} f-03  w-100p pd-20-0`}>
                <div className="wrapper w-100p d-f jc-between ">
                    <div className="f-column gap-20">
                        <Logo fill={"white"}/>
                        <SelectCity classNamePopup={styles.menuSelectPopup} className={styles.menuSelectCity}/>
                    </div>
                    <div className={`${styles.closeWrapper} w-content d-f`}>
                        <div onClick={handleClose} className="w-content h-content">
                            <ThinClose fill={"white"} width={20} height={20}/>
                        </div>

                    </div>
                </div>


            </div>
            <div className="wrapper f-1 w-100p">
                <div className="f-column jc-between h-100p gap-5 pd-20-0">
                    <Link className={`${styles.navItem} f-c-col p-rel`} to={"/"}>
                        О нас
                    </Link>
                    <Link className={`${styles.navItem} f-c-col p-rel`} to={"/"}>
                        О нас
                    </Link>
                    <Link className={`${styles.navItem} f-c-col p-rel`} to={"/"}>
                        О нас
                    </Link>
                    <Link className={`${styles.navItem} f-c-col p-rel`} to={"/"}>
                        О нас
                    </Link>
                    <Link className={`${styles.navItem} f-c-col p-rel`} to={"/"}>
                        О нас
                    </Link>
                    <Link className={`${styles.navItem} f-c-col p-rel`} to={"/"}>
                        О нас
                    </Link>
                    <Link className={`${styles.navItem} f-c-col p-rel`} to={"/"}>
                        О нас
                    </Link>
                    <Link className={`${styles.navItem} f-c-col p-rel`} to={"/"}>
                        О нас
                    </Link>
                </div>
            </div>
            <div className={`${styles.footer} pd-20-0 f-4`}>
                <div className="wrapper">
                    <div className="f-column gap-20">
                        <div className="f-column gap-10">
                            <b>Контакты</b>
                            <a href="">mail@mail.ru</a>
                            <a href="">+7 (495) 345-64-54</a>
                        </div>
                        <div className={`d-f gap-10`}>
                            <a href="" className={`f-c-col ${styles.socialItem}`}>
                                <VkIcon/>
                            </a>
                            <a href="" className={`f-c-col ${styles.socialItem}`}>
                                <VkIcon/>
                            </a>
                            <a href="" className={`f-c-col ${styles.socialItem}`}>
                                <VkIcon/>
                            </a>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    );
};

export default MenuMobile;