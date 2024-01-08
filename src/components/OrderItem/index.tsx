import React, { FC } from 'react';
import { Supplement } from "../../types/api/api.types";
import styles from "../../pages/Order/order.module.scss";
import { domain } from "../../http/instance/instances";
import { formatNumberWithSpaces } from "../../utils/common/numberWithSpaces";
import useTheme from '../../hooks/useTheme';
import { N_CartProduct } from '../../types/api/cart.api.types';

type OrderItemProps = {
    id: number,
    image: string,
    title: string,
    composition: string,
    discount_price: number,
    is_discount: boolean,
    price: number,
    count: number
    supplements?: Supplement[]
}
const OrderItem: FC<N_CartProduct> = (props) => {
    // const additivePrice = supplements.length > 0 ? supplements.reduce((a, b) => {
    //     return a + b.price
    // }, 0) : 0
    const additivePrice = 0
    const gTheme = useTheme()
    const hasDiscount =  props.product.discount_procent > 0
    return (
        <div className={`${styles.part} ${styles.product} pd-15 d-f gap-10`}>
            <div style={{ backgroundImage: `url(${domain + "/" + props.product.image})` }}
                className={`bg-cover ${styles.image}`}></div>
            <div className="f-column-betw f-1 gap-5">
                <div className="top f-column gap-5">
                    <div className="d-f gap-10">
                        <h4>{props.product.title} × {props.count}</h4>
                    </div>
                    <p>{props.product.description}</p>
                    {/* {
                        supplements.length > 0 ?
                            <p>+ {supplements.map(item => item.title).join(", ")}</p>
                            : null
                    } */}
                </div>
                <div className="d-f al-end gap-10">
                    {
                       hasDiscount ?
                            <div className={`sale p-rel`}>
                                <div className={`saleLine p-abs`}></div>
                                <strong className={gTheme("lt-gray-c", "dk-gray-c")}>{(props.product.price + additivePrice) * (props?.count !== undefined ? props.count : 0)} ₽</strong>
                            </div> : null
                    }
                    <strong className={`${styles.price} ${gTheme("c-black", "c-black")}`}>{formatNumberWithSpaces(((hasDiscount ? ~~props.product.discount_price : props.product.price) + additivePrice) *  (props?.count !== undefined ? props.count : 0))} ₽</strong>
                </div>

            </div>
        </div>
    )
}

export default OrderItem;