import React, {Dispatch, FC, SetStateAction, useState} from 'react';
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
import {addToCart, editSupplementsCountCart, setProductAfterAddress} from "../../../features/cart/cartSlice";
import useToken from "../../../hooks/useToken";
import List from "../../List";
import {domain} from "../../../http/instance/instances";
import useCartAdd from "../../../hooks/useCartAdd";
import {CartCountSupplementsRequest, ProductRes} from "../../../types/api.types";
import {arraysEqual} from "../../../utils/arrayEquals";

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
    selected?: boolean,
    setAddedSupplements: Dispatch<SetStateAction<Array<number>>>,
    addedSupplementsIds: Array<number>
}

const SupplementItem: FC<SupplementProps> = ({
                                                 id,
                                                 price,
                                                 addedSupplementsIds,
                                                 title,
                                                 setAddedSupplements,
                                                 selected
                                             }) => {
    const added = addedSupplementsIds.some(sup => sup === id)
    const addSupplement = (id: number) => {
        setAddedSupplements(prev => [...prev, id])
    }
    const removeSupplement = (id: number) => {
        setAddedSupplements(prev => prev.filter(sup_id => sup_id !== id))
    }

    const handleSupplement = (id: number) => {
        if (added) {
            removeSupplement(id)
            return;
        }
        addSupplement(id)

    }
    return (
        <div className={`${styles.supplementItem}  f-row-betw`}>
            <div className="left d-f gap-10 al-end ">
                <p>{title}</p>
                <div className={`${styles.price}`}>+ {price} ₽</div>
            </div>
            <div onClick={() => handleSupplement(id)}
                 className={`${styles.checkbox} ${added ? styles.checkboxSelected : ""} w-content h-content f-c-col`}>
                {
                    added ? <CheckedMark stroke={"white"} height={10}/> : null
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
        additives = [],
        imageUrl,
        price,
        weight,
        name,
        description,
        id,
        cart_id
    } = useAppSelector(state => state.modals.productAdditivesData)

    const dispatch = useAppDispatch()
    const token = useToken()
    const handleAddedPopup = useCartAdd()
    const {address, restaurant} = useAppSelector(state => state.forms.orderForm)
    const {items} = useAppSelector(state => state.products)
    const cart = useAppSelector(state => state.cart.items)
    const saveMode = useAppSelector(state => state.modals.isChangingModeAdditives)

    const [addedSupplements, setAddedSupplements] = useState<number[]>(additives?.length > 0 ?
        cart.some(cartProd => cartProd.product.id === id) ?
            cart.filter(cartProd => cartProd.product.id === id)[0]?.supplements.map(cartSup => cartSup.id) : []
        : [])

    const saveChangesAdditives = () => {
        const supplementsThisProduct = cart.filter(cartProd => cartProd.product.id === id)[0]?.supplements
        const supplementsIdsProduct = supplementsThisProduct?.map(item => {
            return item.id
        })
        const addedEqualsCart = arraysEqual(supplementsIdsProduct, addedSupplements)

        if(addedEqualsCart) {
            dispatch(handleProductAdditives())
            return;
        }

        const changedData: CartCountSupplementsRequest = {
            supplements: supplementsThisProduct.map(item => {
                const cartId = cart_id !== undefined ? cart_id : -1
                const addedIncludesId =  addedSupplements.includes(item.id)
                return {
                    cart_id: cartId,
                    supplements_id: id,
                    added: addedIncludesId
                }
            })

        }

        dispatch(editSupplementsCountCart(changedData))
    }

    const getAddedSupplements = (product: ProductRes) => {
        return product.supplements.filter(item => {
            if(addedSupplements.includes(item.id)) {
                return item
            }
        })
    }

    const handleAddToCartClick = () => {
        dispatch(handleProductAdditives())
        if (token) {
            const deliveryIsDefined = address.val.length > 0 || restaurant !== -1
            if (deliveryIsDefined) {
                const product = items.filter(item => item.id === id)[0]
                dispatch(addToCart({
                    ...product,
                    supplements: getAddedSupplements(product)
                }))
                handleAddedPopup(name, weight)
                return;
            }
            dispatch(setProductAfterAddress(id))
            dispatch(handleYourAddress())
            return
        }
        dispatch(handleLogin())

    }

    const additivePrice = addedSupplements?.length > 0 ? additives.reduce((a, b) => {
        if (addedSupplements.some(sup => sup === b.id)) {
            return a + b.price
        }
        return a
    }, 0) : 0

    return (
        <ShadowWrapper className={`${styles.additivesWindow} f-c-col p-fix h-100v w-100v`}
                       onClick={() => dispatch(handleProductAdditives())}>

            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f al-end jc-end">
                    <div onClick={() => dispatch(handleProductAdditives())} className={`closeWrapper ${styles.close}`}>
                        <CloseIcon isDark={true}/>
                    </div>
                </div>
                <div className="f-row-betw h-100p gap-40">
                    <div style={{backgroundImage: `url(${domain + imageUrl})`}} className={`${styles.productImage}`}>

                    </div>
                    <div className={`${styles.productAdditivesBar} f-column-betw gap-10`}>
                        <div className="top f-column gap-10">
                            <div className={`${styles.titleBlock} jc-between d-f al-center gap-20`}>
                                <h3>{name}</h3>
                                <div className={styles.weight}>{weight} г</div>
                            </div>
                            <p className={styles.description}>{description || "Описание не заполнено"}</p>
                        </div>
                        <div className={`${additives?.length ? "f-1" : ""} content gap-10 f-column-betw`}>
                            {
                                additives?.length ?
                                    <div className="additivesListBlock f-1 gap-10 f-column">
                                        <h4>Дополнительно</h4>
                                        <List
                                            listBlockClassname={`${styles.supplementsList} f-column gap-10`}
                                            list={additives}
                                            renderItem={
                                                (item) => <SupplementItem
                                                    addedSupplementsIds={addedSupplements}
                                                    setAddedSupplements={setAddedSupplements}
                                                    title={item.title}
                                                    id={item.id}
                                                    price={item.price}

                                                />}
                                        />

                                    </div> : null

                            }

                            <RedButton onClick={saveMode ? saveChangesAdditives : handleAddToCartClick} disabled={false}
                                       className={"pd-10-0"}>

                                {!saveMode ? `Добавить в корзину за ${price + additivePrice} ₽` : "Сохранить"}
                            </RedButton>
                        </div>

                    </div>
                </div>
            </WindowBody>
        </ShadowWrapper>
    );
};

export default ProductAdditives;