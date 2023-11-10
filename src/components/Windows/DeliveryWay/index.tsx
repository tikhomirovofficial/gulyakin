import React, {FC, useEffect, useState} from 'react';
import WindowBody from "../WhiteWrapper";
import {CloseIcon, Geo} from "../../../icons";
import RedButton from "../../Buttons/RedButton";
import ShadowWrapper from "../ShadowWrapper";
import styles from './deliveryWay.module.scss'
import Switcher from "../../Switcher";
import InputWrapper from "../../Inputs/InputWrapper";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import GrayBorderedBlock from "../../GrayBorderedBlock";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import SuccessWindow from "../SuccessWindow";
import {handleDeliveryVariant, handleDeliveryWayWindow} from "../../../features/modals/modalsSlice";
import {handleOrderFormVal, handleSelectAddressId, handleSelectRestaurant} from "../../../features/forms/formsSlice";
import {useInput} from "../../../hooks/useInput";
import {addToCart, addToCartCombo, setProductAfterAddress} from "../../../features/cart/cartSlice";
import {getImgPath} from "../../../utils/getAssetsPath";
import {setSelectedInDelivery, setSelectedInPickup} from "../../../features/restaurants/restaurantsSlice";
import {Address} from "../../../types/user.types";
import {checkFilledValues} from "../../../utils/forms/checkFilledValues";
import {addAddressUser} from "../../../features/profile/profileSlice";
import {AddressByMarketCity} from "../../../types/api.types";
import {deleteSeconds} from "../../../utils/deleteSecondsInTime";
import useCartAdd from "../../../hooks/useCartAdd";

interface AddressItemProps {
    selected: boolean,
    text: string
    disabled?: boolean,
    timeWork?: string[],
    selectedHandle?: () => void
}


const AddressItem: FC<AddressItemProps> = ({selected, text, selectedHandle, timeWork, disabled = false}) => {
    if (disabled) {
        return (
            <GrayBorderedBlock disabled={disabled} className={`pd-20 d-f gap-10 cur-pointer ${styles.addressItem} `}>
                <Geo/>
                <div className={`f-column gap-5 ${styles.text}`}>
                    <h2>{text}</h2>
                    {
                        timeWork ?
                            <div className="f-column">
                                <div
                                    className={styles.timeWork}>{deleteSeconds(timeWork[0])} — {deleteSeconds(timeWork[1])}</div>
                            </div> : null

                    }

                </div>
            </GrayBorderedBlock>
        )
    }
    return (
        <GrayBorderedBlock clickHandler={selectedHandle} isFocused={selected}
                           className={`pd-20 d-f gap-10 cur-pointer ${styles.addressItem} `}>
            <Geo/>
            <div className={`f-column gap-5 ${styles.text}`}>
                <h2>{text}</h2>
                {
                    timeWork ?
                        <div className="f-column">
                            <div
                                className={styles.timeWork}>{deleteSeconds(timeWork[0])} — {deleteSeconds(timeWork[1])}</div>
                        </div> : null

                }
            </div>
        </GrayBorderedBlock>
    )
}
type SearchAddressItemProps = {
    address: string,
    city: string
}
type DeliveryWayCommonProps = {
    addToCartWithAfterClose: () => void,
    handleIsSelectingAddress?: () => void
}
const SearchAddressItem: FC<SearchAddressItemProps> = ({address, city}) => {
    return (
        <div className={`pd-10 ${styles.searchAddressItem} f-column gap-5`}>
            <b>{address}</b>
            <p>{city}</p>
        </div>
    )
}


const DeliveryVariant: FC<DeliveryWayCommonProps> = ({addToCartWithAfterClose}) => {
    const [findedAddresses, setFindedAddressess] = useState<Array<SearchAddressItemProps>>([
        {
            address: "Ханты-Мансийский автономный округ, Сургут, улица Энергетиков, 24",
            city: "Сургут, ул. Университетская, д. 9"
        },
        {
            address: "Ханты-Мансийский автономный округ, Сургут, улица Энергетиков, 24",
            city: "Сургут, ул. Университетская, д. 9"
        },
        {
            address: "Ханты-Мансийский автономный округ, Сургут, улица Энергетиков, 24",
            city: "Сургут, ул. Университетская, д. 9"
        },
        {
            address: "Ханты-Мансийский автономный округ, Сургут, улица Энергетиков, 24",
            city: "Сургут, ул. Университетская, д. 9"
        }
    ])
    const {addProductAfterAddress} = useAppSelector(state => state.cart)
    const products = useAppSelector(state => state.products)
    const dispatch = useAppDispatch()

    const [formNewAddress, setFormNewAddress] = useState<Address>({
        city: "",
        code_door: "",
        entrance: "",
        flat: "",
        floor: "",
    })
    const handleFormNewAddress = (key: keyof Address, val: string) => {
        setFormNewAddress(prevState => {
            prevState[key] = val
            return {...prevState}
        })
    }

    const handleAddAddress = () => {
        dispatch(handleOrderFormVal({
            keyField: "address",
            val: addressInput
        }))
        dispatch(addAddressUser({
            adress: formNewAddress.city,
            apartment: Number(formNewAddress.flat),
            door_code: Number(formNewAddress.code_door),
            entrance: Number(formNewAddress.entrance),
            floor: Number(formNewAddress.floor)
        }))
        addToCartWithAfterClose()
    }

    const isValidAddressData = checkFilledValues(formNewAddress, [])

    const {address} = useAppSelector(state => state.forms.orderForm)
    const [addressInput, changeVal, setVal] = useInput(address.val)

    return (
        <>
            <div className={`${styles.deliveryWayForm} f-column gap-10 f-1`}>
                <div className={"d-f w-100p p-rel"}>
                    <InputWrapper
                        setVal={val => handleFormNewAddress("city", val)}
                        changeVal={(e) => handleFormNewAddress("city", e.currentTarget.value)}
                        inputVal={formNewAddress.city}
                        inputId={"address-input"}
                        className={"w-100p"}
                        placeholder={"Сургут, ул. Университетская, д. 9"}
                        labelText={
                            <div className={"d-f al-center gap-5 svgRedStroke"}>
                                Город, улица и дом
                                <div className={"f-c-col w-content"}>
                                    <Geo width={12}/>
                                </div>
                            </div>
                        }/>
                    {
                        !findedAddresses.length ?
                            <div className={`${styles.searchedMatches} pd-10 p-abs left-0 w-100p bg-white`}>
                                {
                                    findedAddresses.map(item => (
                                        <SearchAddressItem address={item.address} city={item.city}/>
                                    ))
                                }

                            </div> : null
                    }


                </div>
                <div className={`f-row-betw gap-20 ${styles.inputParts} flex-wrap`}>
                    <InputWrapper
                        setVal={val => handleFormNewAddress("entrance", val)}
                        changeVal={(e) => handleFormNewAddress("entrance", e.currentTarget.value)}
                        inputVal={formNewAddress.entrance}
                        inputId={"entrance-input"}
                        className={styles.partInputBlock}
                        placeholder={""}
                        labelText={"Подъезд"}/>
                    <InputWrapper
                        setVal={val => handleFormNewAddress("code_door", val)}
                        changeVal={(e) => handleFormNewAddress("code_door", e.currentTarget.value)}
                        inputVal={formNewAddress.code_door}
                        inputId={"code_door-input"}
                        className={styles.partInputBlock}
                        placeholder={""}
                        labelText={"Код двери"}/>

                </div>
                <div className={`f-row-betw gap-20 ${styles.inputParts} flex-wrap`}>
                    <InputWrapper
                        setVal={val => handleFormNewAddress("floor", val)}
                        changeVal={(e) => handleFormNewAddress("floor", e.currentTarget.value)}
                        inputVal={formNewAddress.floor}
                        inputId={"floor-input"}
                        className={styles.partInputBlock}
                        placeholder={""}
                        labelText={"Этаж"}/>
                    <InputWrapper
                        setVal={val => handleFormNewAddress("flat", val)}
                        changeVal={(e) => handleFormNewAddress("flat", e.currentTarget.value)}
                        inputVal={formNewAddress.flat}
                        inputId={"flat-input"}
                        className={styles.partInputBlock}
                        placeholder={""}
                        labelText={"Квартира"}/>

                </div>
            </div>
            <RedButton onClick={handleAddAddress} disabled={!isValidAddressData}
                       className={`pd-10-0 ${styles.deliveryBtn}`}>Добавить</RedButton>
        </>
    )
}
const AddressProfileVariant: FC<DeliveryWayCommonProps> = ({addToCartWithAfterClose, handleIsSelectingAddress}) => {
    const {addresses} = useAppSelector(state => state.profile)
    const {selectedInDelivery} = useAppSelector(state => state.restaurants)
    const dispatch = useAppDispatch()

    const handleToNewAddress = () => {
        if (handleIsSelectingAddress) {
            handleIsSelectingAddress()
        }
        dispatch(setSelectedInDelivery(-1))
    }

    const handleAddAddressDelivery = () => {
        dispatch(handleSelectAddressId(selectedInDelivery))
        addToCartWithAfterClose()
    }

    return (
        <>
            <div className={`f-column gap-10 h-100p ${styles.addressesList}`}>
                {
                    addresses.map(item => (
                        <AddressItem selected={item.id === selectedInDelivery} text={item.city}
                                     key={item.id} selectedHandle={() => dispatch(setSelectedInDelivery(item.id))}
                        />
                    ))
                }
                <b onClick={handleToNewAddress} className={"colorRed"}>Добавить адрес</b>
            </div>
            <RedButton disabled={selectedInDelivery == -1} onClick={handleAddAddressDelivery} className={`pd-10-0 ${styles.deliveryBtn}`}>Выбрать</RedButton>
        </>
    )

}
const PickupVariant: FC<DeliveryWayCommonProps> = ({addToCartWithAfterClose}) => {
    const {addresses} = useAppSelector(state => state.main)
    const {selectedInPickup} = useAppSelector(state => state.restaurants)

    const dispatch = useAppDispatch()

    const handleAddAddressPickup = () => {
        dispatch(handleSelectRestaurant(selectedInPickup))
        addToCartWithAfterClose()
    }
    return (
        <>
            <div className={`f-column gap-10 h-100p ${styles.addressesList}`}>
                {addresses.map((item) => (
                    <AddressItem text={item.adress}
                                 timeWork={[item.work_with, item.works_until]}
                                 key={item.id} selectedHandle={() => {
                        dispatch(setSelectedInPickup(item.id))
                    }}
                                 selected={item.id === selectedInPickup}/>
                ))}
            </div>
            <RedButton onClick={handleAddAddressPickup} disabled={selectedInPickup == -1}
                       className={"pd-10-0"}>Выбрать</RedButton>
        </>

    )
}


const DeliveryWay = () => {
    const dispatch = useAppDispatch()
    const handleAddedPopup = useCartAdd()

    const {variant} = useAppSelector(state => state.modals.deliveryWay)
    const {addresses, isPhone} = useAppSelector(state => state.main)
    const profileAddresses = useAppSelector(state => state.profile.addresses)
    const {selectedInPickup} = useAppSelector(state => state.restaurants)
    const [currentAddress, setCurrentAddress] = useState<AddressByMarketCity | null>(null)
    const [deliveryFromProfile, setDeliveryFromProfile] = useState(false)

    const getCurrentAddress = () => {
        if (addresses.length > 0) {
            if (selectedInPickup !== -1) {
                return addresses.filter(item => item.id === selectedInPickup)[0]
            }
            return addresses[0]
        }
        return null
    }

    useEffect(() => {
        setCurrentAddress(getCurrentAddress())
    }, [addresses, selectedInPickup])

    const getMapCenter = () => {
        if (currentAddress !== null && currentAddress !== undefined) {
            return [currentAddress.long, currentAddress.lat]
        }
        return [0, 0]
    }


    const {addProductAfterAddress} = useAppSelector(state => state.cart)
    const products = useAppSelector(state => state.products)
    const addToCartWithClose = () => {
        if (addProductAfterAddress !== null) {
            if(!addProductAfterAddress.is_combo) {
                const matchedProduct = products.items.filter(item => item.id == addProductAfterAddress.id)[0]
                if (matchedProduct?.id !== undefined) {
                    const addProductSups = addProductAfterAddress.supplements
                    const addProductSupsDefined = addProductSups !== undefined
                    dispatch(addToCart({
                        ...matchedProduct,
                        supplements: addProductSupsDefined ? addProductSups?.map(supId => {
                            return matchedProduct.supplements.filter(sup => sup.id === supId)[0]
                        }) : []
                    }))
                    handleAddedPopup(matchedProduct.title, matchedProduct.weight)

                }
            } else {
                const matchedCombo = products.combos.filter(item => item.id == addProductAfterAddress.id)[0]
                if (matchedCombo?.id !== undefined) {
                    dispatch(addToCartCombo({
                        combo: [
                            {
                                count: 1,
                                id: matchedCombo.id,
                                selected_product: addProductAfterAddress.selected_product || 1

                            }
                        ],
                        combo_prod: {
                            ...matchedCombo
                        },


                    }))
                    handleAddedPopup(matchedCombo.title, matchedCombo.weight)

                }
            }
            dispatch(setProductAfterAddress(null))
            dispatch(handleDeliveryWayWindow())

        }
    }

    const handleAddressFromProfile = () => {
        setDeliveryFromProfile(prev => !prev)
    }

    const closeDeliveryWay = () => {
        dispatch(handleDeliveryWayWindow())
        dispatch(setSelectedInPickup(-1))
    }
    const handleDeliveryWay = (index: number) => {
        dispatch(handleDeliveryVariant(index))
        dispatch(setSelectedInPickup(-1))
    }


    return (
        <ShadowWrapper onClick={closeDeliveryWay}>
            <SuccessWindow isOpened={false} title={"Ваш адрес успешно добавлен!"}/>
            <WindowBody className={`${styles.window} f-row-betw p-rel`}>
                <div onClick={closeDeliveryWay} className={"modalAbsoluteClose closeWrapper p-abs"}>
                    <CloseIcon isDark={true}/>
                </div>
                <div className={`${styles.content} f-column-betw pd-30 gap-20`}>
                    <div className="top f-column gap-10">
                        <div className="f-column gap-5">
                            <h2>{!variant ? "Новый адрес" : "Самовывоз"}</h2>
                            {
                                profileAddresses.length  && !deliveryFromProfile ? <b onClick={handleAddressFromProfile} className={"colorRed"}>Выбрать существующий</b> : null
                            }

                        </div>

                        <Switcher onSwitch={handleDeliveryWay} currentSelected={variant}
                                  elements={["Доставка", "Самовывоз"]}/>

                    </div>
                    {isPhone ? <div className={styles.map}>
                        <YMaps>
                            <Map className={`${styles.mapContainer} h-100p w-100p`}
                                 state={{
                                     center: getMapCenter(),
                                     zoom: 15
                                 }}>
                                {
                                    currentAddress !== null && currentAddress !== undefined ?
                                        <Placemark geometry={[currentAddress.long, currentAddress.lat]} options={
                                            {
                                                iconLayout: 'default#image', // Используем стандартный макет изображения
                                                iconImageHref: getImgPath("/logos/logo_gulyakin.svg"), // Укажите URL вашей кастомной иконки
                                                iconImageSize: [52, 52], // Размер вашей иконки
                                                iconImageOffset: [20, 20],
                                            }
                                        }/> : null

                                }

                            </Map>
                        </YMaps>
                    </div> : null

                    }

                    {
                        !variant ?
                            !deliveryFromProfile ?
                            <DeliveryVariant addToCartWithAfterClose={addToCartWithClose}/> :
                            <AddressProfileVariant handleIsSelectingAddress={handleAddressFromProfile} addToCartWithAfterClose={addToCartWithClose}/> :
                        <PickupVariant addToCartWithAfterClose={addToCartWithClose}/>

                    }

                </div>
                {
                    !isPhone ?
                        <div className={styles.map}>
                            <YMaps>
                                <Map className={"h-100p w-100p"}
                                     state={{
                                         center: getMapCenter(),
                                         zoom: 15
                                     }}>
                                    {
                                        currentAddress !== null && currentAddress !== undefined ?
                                            <Placemark geometry={[currentAddress.long, currentAddress.lat]} options={
                                                {
                                                    iconLayout: 'default#image', // Используем стандартный макет изображения
                                                    iconImageHref: getImgPath("/logos/logo_gulyakin.svg"), // Укажите URL вашей кастомной иконки
                                                    iconImageSize: [52, 52], // Размер вашей иконки
                                                    iconImageOffset: [0, 0],
                                                }
                                            }/> : null

                                    }

                                </Map>
                            </YMaps>
                        </div> : null
                }

            </WindowBody>
        </ShadowWrapper>
    );
};

export default DeliveryWay;