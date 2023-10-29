import React, {FC, useState} from 'react';
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
import {handleDeliveryVariant, handleDeliveryWayWindow, handleNewAddress} from "../../../features/modals/modalsSlice";
import {handleOrderFormVal, handleSelectRestaurant} from "../../../features/forms/formsSlice";
import {useInput} from "../../../hooks/useInput";
import {addToCart, setProductAfterAddress} from "../../../features/cart/cartSlice";
import {getImgPath} from "../../../utils/getAssetsPath";
import {setSelectedInPickup} from "../../../features/restaurants/restaurantsSlice";
import {Address} from "../../../types/user.types";
import {checkFilledValues} from "../../../utils/checkFilledValues";
import {addAddressUser} from "../../../features/profile/profileSlice";

interface AddressItemProps {
    selected: boolean,
    text: string
    disabled?: boolean,
    selectedHandle?: () => void
}


const AddressItem: FC<AddressItemProps> = ({selected, text, selectedHandle, disabled = false}) => {
    if (disabled) {
        return (
            <GrayBorderedBlock disabled={disabled} className={`pd-20 d-f gap-10 cur-pointer ${styles.addressItem} `}>
                <Geo/>
                <div className={`f-column gap-5 ${styles.text}`}>
                    <h2>{text}</h2>
                    <div className="f-column">
                        <div className={styles.timeWork}>Пн-Пт: 7:30 - 23:00</div>
                        <div className={styles.timeWork}>Пн-Пт: 7:30 - 23:00</div>
                    </div>
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
                <div className="f-column">
                    <div className={styles.timeWork}>Пн-Пт: 7:30 - 23:00</div>
                    <div className={styles.timeWork}>Пн-Пт: 7:30 - 23:00</div>
                </div>
            </div>
        </GrayBorderedBlock>
    )
}
type SearchAddressItemProps = {
    address: string,
    city: string
}
type DeliveryWayCommonProps = {
    addToCartWithAfterClose: () => void
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
            <div className="f-column gap-10 f-1">
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
                <div className="f-row-betw gap-20 flex-wrap">
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
                <div className="f-row-betw gap-20 flex-wrap">
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
            <RedButton onClick={handleAddAddress} disabled={!isValidAddressData} className={"pd-10-0"}>Добавить</RedButton>
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
                    <AddressItem text={item.adress} key={item.id} selectedHandle={() => {
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
    const {variant} = useAppSelector(state => state.modals.deliveryWay)
    const {addresses} = useAppSelector(state => state.main)
    const {selectedInPickup} = useAppSelector(state => state.restaurants)
    const currentAddress = selectedInPickup !== -1 ? addresses.filter(item => item.id === selectedInPickup)[0] : addresses[0]
    const {addProductAfterAddress} = useAppSelector(state => state.cart)
    const products = useAppSelector(state => state.products)
    const addToCartWithClose = () => {
        if (addProductAfterAddress !== null) {
            const matchedProduct = products.items.filter(item => item.id == addProductAfterAddress)[0]
            if (matchedProduct?.id !== undefined) {
                dispatch(addToCart({
                    ...matchedProduct,
                }))
                dispatch(setProductAfterAddress(null))
            }
            dispatch(handleDeliveryWayWindow())
        }
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
                        <h2>Новый адрес</h2>
                        <Switcher onSwitch={handleDeliveryWay} currentSelected={variant}
                                  elements={["Доставка", "Самовывоз"]}/>
                    </div>
                    {
                        !variant ?
                            <DeliveryVariant addToCartWithAfterClose={addToCartWithClose}/> :
                            <PickupVariant addToCartWithAfterClose={addToCartWithClose}/>

                    }

                </div>
                <div className={styles.map}>
                    <YMaps>
                        <Map className={"h-100p w-100p"}
                             state={{
                                 center: currentAddress !== null ? [currentAddress.long, currentAddress.lat] : [addresses[0].long, addresses[0].lat],
                                 zoom: 15
                             }}>
                            {
                                currentAddress !== null ?
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
                </div>
            </WindowBody>
        </ShadowWrapper>
    );
};

export default DeliveryWay;