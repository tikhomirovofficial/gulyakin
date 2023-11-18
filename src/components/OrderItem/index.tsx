import React, {FC} from 'react';
import {Supplement} from "../../types/api.types";
import styles from "../../pages/Order/order.module.scss";
import {domain} from "../../http/instance/instances";
import {formatNumberWithSpaces} from "../../utils/common/numberWithSpaces";

type OrderItemProps = {
    id: number,
    image: string,
    title: string,
    composition: string,
    price: number,
    count: number
    supplements?: Supplement[]
}
const OrderItem: FC<OrderItemProps> = ({image, id, title, supplements = [], count, price, composition}) => {
    const additivePrice = supplements.length > 0 ? supplements.reduce((a, b) => {
        return a + b.price
    }, 0) : 0
    return (
        <div className={`${styles.part} ${styles.product} pd-15 d-f gap-10`}>
            <div style={{backgroundImage: `url(${domain + "/" + image})`}}
                 className={`bg-cover ${styles.image}`}></div>
            <div className="f-column-betw f-1 gap-5">
                <div className="top f-column gap-5">
                    <h4>{title}</h4>
                    <p>{composition || "Описание отсутствует"}</p>
                    {
                        supplements.length > 0 ?
                            <p>+ {supplements.map(item => item.title).join(", ")}</p>
                            : null
                    }
                </div>
                <b className={styles.price}>{formatNumberWithSpaces((price + additivePrice) * count)} ₽</b>
            </div>
        </div>
    )
}

export default OrderItem;