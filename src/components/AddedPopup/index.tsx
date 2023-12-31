import React from 'react';
import styles from "../../pages/Main/main.module.scss";
import {useAppSelector} from "../../app/hooks";

const AddedPopup = () => {
    const {totalPrice, cartClassOpened, cartAdded, cartAddedPopupInfo} = useAppSelector(state => state.cart)
    if(!cartAdded) {
        return null
    }
    return (
        <>
            <div className={`${styles.addedPopup} ${cartClassOpened ? styles.addedPopupOpened : ""} p-abs f-column gap-5 t-opacity-visible-3`}>
                <p>В корзину добавлено:</p>
                <b>{cartAddedPopupInfo.title}, {cartAddedPopupInfo.weight} г</b>
            </div>
        </>

    );
};

export default AddedPopup;