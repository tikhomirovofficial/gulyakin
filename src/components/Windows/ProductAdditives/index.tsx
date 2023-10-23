import React, {FC, useState} from 'react';
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import {AddedAdditiveIcon, CancelCircleIcon, CloseIcon} from "../../../icons";
import styles from './productAdditives.module.scss'
import RedButton from "../../Buttons/RedButton";
import {getImgPath} from "../../../utils/getAssetsPath";
import {HasClassName} from "../../../types/components.types";
import {AdditiveProduct} from "../../../types/products.types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import SuccessWindow from "../SuccessWindow";
import {handleLogin, handleProductAdditives, handleYourAddress} from "../../../features/modals/modalsSlice";
import {addToCart} from "../../../features/cart/cartSlice";
import useToken from "../../../hooks/useToken";

type AdditiveItemProps = {
    selected: boolean,
    addHandler: () => void
    isEmpty?: boolean,
    price: number,
    imageUrl?: string,
    name: string

} & AdditiveProduct
const AdditiveItem: FC<HasClassName & AdditiveItemProps> = ({name, addHandler, imageUrl = "", selected, className, isEmpty, price}) => {
    return (
        <div onClick={addHandler} className={`${styles.item} ${selected ? styles.itemSelected : ""} f-column-betw gap-20 al-center txt-center p-rel`}>

            <div className={styles.imageWrapper}>
                {isEmpty ?
                    <div style={{backgroundImage: `url(${getImgPath('additive_plashka.png')})`}} className={`${styles.img} f-c-col`}>
                    </div> :
                    <div style={{backgroundImage: `url(${getImgPath('productAdditive.png')})`}} className={`${styles.img}`}>
                    </div>
                }

            </div>

            <div className={"f-column"}>
                <p>{isEmpty ? "Без соуса" : name}</p>
                <b>{isEmpty ? "Бесплатно" : `${price} ₽`}</b>
            </div>
            <div className={`f-c-col p-abs ${styles.addedIconBlock} t-opacity-visible-3`}>
                <AddedAdditiveIcon width={15} height={15}/>
            </div>
        </div>
    )
}
const ProductAdditives = () => {
    const {additives, imageUrl, price, weight, name, description, id} = useAppSelector(state => state.modals.productAdditivesData)
    const dispatch = useAppDispatch()
    const token = useToken()
    const {address} = useAppSelector(state => state.forms.orderForm)
    const {items} = useAppSelector(state => state.products)
    const [selectedAdditive, setSelectedAdditive] = useState(-1)

    const handleAddToCartClick = () => {
        dispatch(handleProductAdditives())
        if(token) {
            if(address.val.length > 0) {
                const product = items.filter(item => item.id === id)[0]
                dispatch(addToCart({
                    ...product,
                    supplements: [
                        {

                            ...product.supplements.filter(supplement => supplement.id === selectedAdditive)[0]
                        }
                    ]
                }))
                return;
            }
            dispatch(handleYourAddress())
            return
        }
        dispatch(handleLogin())


    }
    const additivePrice = selectedAdditive !== -1 ? additives.filter(supplement => supplement.id === selectedAdditive)[0].price : 0


    return (
        <ShadowWrapper onClick={() => dispatch(handleProductAdditives())}>

            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f al-end jc-end">
                    <div onClick={() => dispatch(handleProductAdditives())} className={`closeWrapper ${styles.close}`}>
                        <CloseIcon isDark={true}/>
                    </div>
                </div>
                <div className="f-row-betw h-100p gap-40">
                    <div style={{backgroundImage: `url(${imageUrl})`}} className={`${styles.productImage}`}>

                    </div>
                    <div className={`${styles.productAdditivesBar} f-column-betw gap-30`}>
                       <div className="top f-column gap-10">
                           <div className={`${styles.titleBlock} d-f al-center gap-20`}>
                                <h3>{name}</h3>
                                <div className={styles.weight}>{weight} г</div>
                           </div>
                           <p className={styles.description}>{description}</p>
                       </div>
                        <div className={`${additives.length ? "f-1" : ""} content gap-10 f-column-betw`}>
                            {
                                additives.length ?
                                    <div className="additivesListBlock f-1 gap-10 f-column">
                                        <h4>Добавьте по вкусу</h4>
                                        <div className={`${styles.additiveList} d-f gap-10 flex-wrap`}>
                                            <AdditiveItem selected={selectedAdditive == -1} isEmpty={true} price={0} name={"Без соуса"} addHandler={() => {
                                                setSelectedAdditive(-1)
                                            }} imageUrl={''}/>
                                            {
                                                additives.map(item => (
                                                    <AdditiveItem isEmpty={false} imageUrl={item.image} selected={selectedAdditive == item.id} price={item.price} name={item.title} addHandler={() => {
                                                        setSelectedAdditive(item.id)
                                                    }}/>
                                                ))
                                            }
                                        </div>
                                    </div> : null

                            }

                            <RedButton onClick={handleAddToCartClick} disabled={false} className={"pd-10-0"}>Добавить в корзину за {price + additivePrice} ₽</RedButton>
                        </div>

                    </div>
                </div>
            </WindowBody>
        </ShadowWrapper>
    );
};

export default ProductAdditives;