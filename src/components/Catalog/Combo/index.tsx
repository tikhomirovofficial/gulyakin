import React, {FC} from 'react';
import styles from "../../../pages/Main/main.module.scss";
import {domain} from "../../../http/instance/instances";
import {AddedAdditiveIcon} from "../../../icons";
import {Combo} from "../../../types/api.types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import useToken from "../../../hooks/useToken";
import useCartAdd from "../../../hooks/useCartAdd";
import {handleLogin, handleProductAdditives, handleYourAddress} from "../../../features/modals/modalsSlice";
import {addToCart, setProductAfterAddress} from "../../../features/cart/cartSlice";

type ComboProps = {

} & Combo
const ComboItem: FC<ComboProps> = (item) => {
    const dispatch = useAppDispatch()
    const token = useToken()
    const handleAddedPopup = useCartAdd()

    const handleAddCombo= () => {
        dispatch(handleProductAdditives())
    }
    return (
        <div onClick={handleAddCombo} className={`${styles.item} p-rel d-f jc-end gap-15`}>
            <div style={{backgroundImage: `url(${domain}/${item.image})`}}
                 className={`${styles.bg} bg-cover`}>
            </div>
            <div className={`${styles.info} f-column gap-5 p-rel`}>
                <h4>{item.title}</h4>
                <p>{item.new_price} ₽</p>
            </div>
            <div className={`d-f al-center p-abs gap-5 ${styles.addedIconBlock} t-opacity-visible-3`}>
                <b className={"colorRed"}>Добавлен</b>
                <AddedAdditiveIcon width={18} height={18}/>
            </div>

        </div>
    );
};

export default ComboItem;