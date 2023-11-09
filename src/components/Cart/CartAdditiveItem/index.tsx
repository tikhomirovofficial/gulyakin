import React, {FC} from 'react';
import {Supplement} from "../../../types/api.types";
import styles from "../cart.module.scss";
import {getImgPath} from "../../../utils/getAssetsPath";
import {MinusIcon, PlusIcon} from "../../../icons";

const CartAdditiveItem: FC<Supplement> = ({id, price, short_description, title, image}) => {
    return (
        <div className={`${styles.additiveItem} f-row-betw gap-30`}>
            <div className="d-f al-center gap-10">
                <img src={getImgPath("productAdditive.png")} alt=""/>
                <div className="f-column">
                    <p>{title}</p>
                    <b>{price} ₽</b>
                </div>
            </div>
            {
                0 ?
                    <div className={"d-f al-center gap-5"}>
                        <div onClick={() => {
                        }} className={"cur-pointer f-c-col"}><MinusIcon fill={"#434343"} width={12}/></div>

                        <div className={styles.count}>{0}</div>
                        <div onClick={() => {
                        }} className={"cur-pointer f-c-col"}><PlusIcon fill={"#434343"} width={12}/></div>

                    </div> :
                    <div className={`${styles.add} colorRed cur-pointer`}>Добавить</div>
            }

        </div>
    )
}

export default CartAdditiveItem;