import React, {FC, useState} from 'react';
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import {AddedAdditiveIcon, CheckedMark, CloseIcon} from "../../../icons";
import styles from './productAdditives.module.scss'
import RedButton from "../../Buttons/RedButton";
import {getImgPath} from "../../../utils/getAssetsPath";
import {HasClassName} from "../../../types/components.types";
import {AdditiveProduct} from "../../../types/products.types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {handleLogin, handleProductAdditives, handleYourAddress} from "../../../features/modals/modalsSlice";
import {
    addToCart,
    cartAddedClose,
    cartAddedOpen,
    resetCartAddedPopupInfo,
    setCartAddedPopupInfo,
    setProductAfterAddress
} from "../../../features/cart/cartSlice";
import useToken from "../../../hooks/useToken";
import List from "../../List";

type AdditiveItemProps = {
    selected: boolean,
    addHandler: () => void
    isEmpty?: boolean,
    price: number,
    imageUrl?: string,
    name: string

} & AdditiveProduct
const AdditiveItem: FC<HasClassName & AdditiveItemProps> = ({
                                                                name,
                                                                addHandler,
                                                                imageUrl = "",
                                                                selected,
                                                                className,
                                                                isEmpty,
                                                                price
                                                            }) => {
    return (
        <div onClick={addHandler}
             className={`${styles.item} ${selected ? styles.itemSelected : ""} f-column-betw gap-20 al-center txt-center p-rel`}>

            <div className={styles.imageWrapper}>
                {isEmpty ?
                    <div style={{backgroundImage: `url(${getImgPath('additive_plashka.png')})`}}
                         className={`${styles.img} f-c-col`}>
                    </div> :
                    <div style={{backgroundImage: `url(${getImgPath('productAdditive.png')})`}}
                         className={`${styles.img}`}>
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

type SupplementProps = {
    id: number,
    price: number,
    title: string
    selected?: boolean
}

const SupplementItem: FC<SupplementProps> = ({id, price, title, selected}) => {
    const [addedSupplements, setAddedSupplements] = useState<number[]>([1])

    const addSupplement = (id: number) => {
        setAddedSupplements(prev => [...prev, id])
    }
    const removeSupplement = (id: number) => {
        setAddedSupplements(prev => prev.filter(sup_id => sup_id !== id))
    }

    const handleSupplement = (id: number) => {
        const added = addedSupplements.some(sup => sup === id)
        if (added) {
            removeSupplement(id)
            return;
        }
        addSupplement(id)

    }
    return (
        <div className={`${styles.supplementItem}  f-row-betw`}>
            <div className="left d-f gap-10 al-end ">
                <p>{id}</p>
                <div className={`${styles.price}`}>+ 57 ₽</div>
            </div>
            <div onClick={() => handleSupplement(id)}
                 className={`${styles.checkbox} ${addedSupplements.some(sup => sup === id) ? styles.checkboxSelected : ""} w-content h-content f-c-col`}>
                {
                    addedSupplements.some(sup => sup === id) ?
                        <CheckedMark stroke={"white"} height={10}/> : null
                }
            </div>
        </div>
    );
};

const sups = [
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    }
]
const ProductAdditives = () => {
    const {
        additives,
        imageUrl,
        price,
        weight,
        name,
        description,
        id
    } = useAppSelector(state => state.modals.productAdditivesData)
    const dispatch = useAppDispatch()
    const token = useToken()
    const {address, restaurant} = useAppSelector(state => state.forms.orderForm)
    const {items} = useAppSelector(state => state.products)
    const [selectedAdditive, setSelectedAdditive] = useState(-1)

    const handleAddToCartClick = () => {
        dispatch(handleProductAdditives())
        if (token) {
            const deliveryIsDefined = address.val.length > 0 || restaurant !== -1
            if (deliveryIsDefined) {
                const product = items.filter(item => item.id === id)[0]
                dispatch(addToCart({
                    ...product
                }))
                dispatch(setCartAddedPopupInfo({
                    title: name,
                    weight
                }))

                dispatch(cartAddedOpen())
                setTimeout(() => {
                    dispatch(cartAddedClose())
                    setTimeout(() => {
                        dispatch(resetCartAddedPopupInfo())
                    }, 300)
                }, 2000)
                return;
            }
            dispatch(setProductAfterAddress(id))
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
                    <div className={`${styles.productAdditivesBar} f-column-betw gap-10`}>
                        <div className="top f-column gap-10">
                            <div className={`${styles.titleBlock} jc-between d-f al-center gap-20`}>
                                <h3>{name}</h3>
                                <div className={styles.weight}>{weight} г</div>
                            </div>
                            <p className={styles.description}>{description || "Описание не заполнено"}</p>
                        </div>
                        <div className={`${!additives.length ? "f-1" : ""} content gap-10 f-column-betw`}>
                            {
                                !additives.length ?
                                    <div className="additivesListBlock f-1 gap-10 f-column">
                                        <h4>Дополнительно</h4>
                                        <List
                                            listBlockClassname={`${styles.supplementsList} f-column gap-10`}
                                            list={sups}
                                            renderItem={
                                            (item) => <SupplementItem
                                                title={"Добавка"}
                                                id={item.id}
                                                price={50}

                                            />}
                                        />

                                    </div> : null

                            }

                            <RedButton onClick={handleAddToCartClick} disabled={false} className={"pd-10-0"}>Добавить в
                                корзину за {price + additivePrice} ₽</RedButton>
                        </div>

                    </div>
                </div>
            </WindowBody>
        </ShadowWrapper>
    );
};

export default ProductAdditives;