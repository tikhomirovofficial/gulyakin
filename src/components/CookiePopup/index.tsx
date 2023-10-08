import React, {FC} from 'react';
import styles from './cookiePopup.module.scss'
import {MicroCloseIcon} from "../../icons";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {handleCookieAccepted} from "../../features/modals/modalsSlice";

interface CookiePopupProps {
    isOpened: boolean
}
const CookiePopup: FC<CookiePopupProps> = ({isOpened}) => {

    const dispatch = useAppDispatch()

    return (
        <div className={`${styles.cookiePopup} ${!isOpened ? styles.cookiePopupOpened : ""} al-center slide-in-bottom-cookie d-f p-fix gap-10`}>
            <div className={styles.cookieText}>
                Мы используем cookies для быстрой и удобной работы сайта.
                Продолжая пользоваться сайтом, вы принимаете
                <a href="" className={"colorRed"}>&nbsp; условия обработки персональных данных</a>
            </div>
            <div onClick={() => dispatch(handleCookieAccepted())} className="f-c-col w-content cur-pointer">
                <MicroCloseIcon/>
            </div>

        </div>
    );
};

export default CookiePopup;