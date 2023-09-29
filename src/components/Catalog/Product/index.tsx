import React, {FC, useState} from 'react';
import styles from "./product.module.scss";
import {getImgPath} from "../../../utils/getAssetsPath";
import RedButton from "../../Buttons/RedButton";
import {MinusIcon, PlusIcon} from "../../../icons";
import {HasClassName} from "../../../types/components.types";

interface ProductProps {
    name: string
    composition: string
    weight: number
    price: number,
    inCart?: boolean
}


const Product: FC<ProductProps & HasClassName> = ({name, inCart = false, className, composition, weight, price}) => {
    const [count, setCount] = useState<number>(1)
    const [isInCart, setInCart] = useState<boolean>(inCart)
    const addCount = () => setCount(prev => prev + 1)
    const reduceCount = () => setCount(prev => {
        if(prev > 1) {
            return prev - 1
        }
        return prev
    })

    return (
        <div className={`${styles.product} f-column gap-15`}>
            <div style={{backgroundImage: `url(${getImgPath('product.jpg')})`}} className={`${styles.img} w-100p bg-cover`}>

            </div>
            <div className="textBlock f-column gap-5">
                <h3>{name}</h3>
                <div className="f-1 d-f jc-between gap-25">
                    <p>{composition}</p>
                    <div className={`${styles.weight} txt-right`}>{weight} г</div>
                </div>
            </div>

            <div className="f-row-betw">
                <h4>{price} ₽</h4>
                {
                    isInCart ?
                        <div  className={"d-f al-center gap-5"}>
                            <div onClick={reduceCount} className={"cur-pointer f-c-col"}><MinusIcon/></div>

                            <div className={styles.count}>{count}</div>
                            <div onClick={addCount} className={"cur-pointer f-c-col"}><PlusIcon/></div>

                        </div>
                        :

                        <RedButton onClick={() => setInCart(true)} className={`${styles.btn} `}>
                            В корзину
                        </RedButton>
                }

            </div>

        </div>
    );
};

export default Product;