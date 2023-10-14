import React, {FC} from 'react';
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
import {handleProductAdditives, handleYourAddress} from "../../../features/modals/modalsSlice";

type AdditiveItemProps = {
    isAdded: boolean,
    addHandler: () => void
    isEmpty?: boolean,
    price: number,
    imageUrl?: string,
    name: string

} & AdditiveProduct
const AdditiveItem: FC<HasClassName & AdditiveItemProps> = ({name, addHandler, imageUrl = "", isAdded, className, isEmpty, price}) => {
    return (
        <div className={`${styles.item} f-column-betw gap-20 al-center txt-center p-rel`}>

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
    const {additives, imageUrl, price, weight, name, description} = useAppSelector(state => state.modals.productAdditivesData)
    const dispatch = useAppDispatch()

    const handleAddToCartClick = () => {
        dispatch(handleProductAdditives())
        dispatch(handleYourAddress())
    }

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
                                            <AdditiveItem isAdded={false} isEmpty={true} price={0} name={"Без соуса"} addHandler={() => {
                                            }} imageUrl={''}/>
                                            {
                                                additives.map(item => (
                                                    <AdditiveItem isEmpty={false} imageUrl={item.imageUrl} isAdded={false} price={item.price} name={item.name} addHandler={() => {}}/>
                                                ))
                                            }
                                        </div>
                                    </div> : null

                            }

                            <RedButton onClick={handleAddToCartClick} disabled={false} className={"pd-10-0"}>Добавить в корзину за {price} ₽</RedButton>
                        </div>

                    </div>
                </div>
            </WindowBody>
        </ShadowWrapper>
    );
};

export default ProductAdditives;