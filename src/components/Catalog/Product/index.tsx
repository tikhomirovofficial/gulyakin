import React, {FC, useState} from 'react';
import styles from "./product.module.scss";
import {getImgPath} from "../../../utils/getAssetsPath";
import RedButton from "../../Buttons/RedButton";
import {MinusIcon, PlusIcon} from "../../../icons";
import {HasClassName} from "../../../types/components.types";
import {useAppDispatch} from "../../../app/hooks";
import {handleProductAdditives, handleYourAddress, setProductAdditivesData} from "../../../features/modals/modalsSlice";
import {Supplement} from "../../../types/api.types";

interface ProductProps {
    id: number,
    count?: number,
    name: string
    composition: string
    weight: number,
    image?: string,
    price: number,
    inCart?: boolean,
    supplements?: Array<Supplement>
}


const Product: FC<ProductProps & HasClassName> = ({name, supplements= [], image, id, count = 0 , inCart = false, className, composition, weight, price}) => {
    const dispatch = useAppDispatch()

    // const [count, setCount] = useState<number>(count1)
    // const [isInCart, setInCart] = useState<boolean>(inCart)
    // const addCount = () => setCount(prev => prev + 1)
    // const reduceCount = () => setCount(prev => {
    //     if(prev > 1) {
    //         return prev - 1
    //     }
    //     return prev
    // })

    const handleAddToCart = () => {
        if(supplements.length) {
            dispatch(setProductAdditivesData({
                additives: [
                    {
                        imageUrl: getImgPath("productAdditive.png"),
                        name: "Кетчуп",
                        price: 59
                    }
                ],
                currentAdditive: 0,
                description: composition,
                imageUrl: image || "",
                name: name,
                price: price,
                weight: weight

            }))
            dispatch(handleProductAdditives())
            return;
        }
        alert("Добавление")


    }

    return (
        <div className={`${styles.product} h-100p f-column-betw gap-15`}>
            <div className="f-column gap-15">
                <div style={{backgroundImage: `url(${getImgPath('product.jpg')})`}} className={`${styles.img} w-100p bg-cover`}>

                </div>
                <div className="textBlock f-column gap-5">
                    <h3>{name}</h3>
                    <div className="f-1 d-f jc-between gap-25">
                        <p>{composition}</p>


                        <div className={`${styles.weight} txt-right`}>{weight} г</div>
                    </div>
                </div>


            </div>
            <div style={{minHeight: 37}} className="f-row-betw">
                <h4>{price} ₽</h4>
                {
                    inCart ?
                        <div  className={"d-f al-center gap-5"}>
                            <div onClick={() => alert("Уменьшить")} className={"cur-pointer f-c-col"}><MinusIcon/></div>

                            <div className={styles.count}>{count}</div>
                            <div onClick={() => alert("Увеличить")} className={"cur-pointer f-c-col"}><PlusIcon/></div>

                        </div>
                        :

                        <RedButton onClick={handleAddToCart} className={`${styles.btn} `}>
                            В корзину
                        </RedButton>
                }

            </div>

        </div>
    );
};

export default Product;