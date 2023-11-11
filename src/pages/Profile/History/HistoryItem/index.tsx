import React, {FC} from 'react';
import {GetOrderItem} from "../../../../types/api.types";
import styles from "../../profile.module.scss";
import {formatNumberWithSpaces} from "../../../../utils/numberWithSpaces";
import {domain} from "../../../../http/instance/instances";
import {ArrowMiniRightIcon} from "../../../../icons";


export type HistoryItemProps = Pick<GetOrderItem, "price" | "is_active" | "is_payment" | "order_id" | "products">
const HistoryItem: FC<HistoryItemProps> = ({
    order_id,
    is_active,
    is_payment,
    products,
    price
                                           }) => {
    const getOrderStatus = () => {
        if(is_payment) {
            if(is_active) {
                return "Активен"
            }
            return "Исполнен"
        }
        return "Активен"
    }
    return (
        <div className={`pd-10 f-row-betw ${styles.orderItem}`}>
            <div className="left d-f al-center gap-10">
                <div className={`${styles.imgBlock} p-rel`}>
                    <div style={{backgroundImage: `url(${domain}${products[0].image})`}} className={`${styles.imgItem}`}></div>
                </div>
                <div className="f-column-betw al-start">
                    <div className={`${styles.orderInfoTop} d-f jc-end`}>
                        <p>Заказ</p>
                        <b>№{order_id}</b>
                    </div>
                    <div className={`${styles.orderInfoBottom} d-f jc-end`}>
                        <p>Сумма</p>
                        <b>{formatNumberWithSpaces(price)} ₽</b>
                    </div>
                </div>
            </div>
            <div className="right d-f al-center gap-40">
                <div className="f-column-betw al-start">
                    <div className={`${styles.orderInfoTop} d-f jc-end`}>
                        <p>Статус</p>
                    </div>
                    <div className={`${styles.orderInfoBottom} d-f jc-end`}>
                        <p>{getOrderStatus()}</p>
                    </div>
                </div>
                <div className={"w-content h-content"}>
                    <ArrowMiniRightIcon height={26}/>
                </div>
            </div>
        </div>
    );
};

export default HistoryItem;