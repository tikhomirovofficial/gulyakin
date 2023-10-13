import React, {FC, useEffect, useState} from 'react';
import WindowBody from "../WhiteWrapper";
import {CloseIcon, Geo} from "../../../icons";
import RedButton from "../../Buttons/RedButton";
import ShadowWrapper from "../ShadowWrapper";
import styles from './deliveryWay.module.scss'
import Switcher from "../../Switcher";
import InputWrapper from "../../Inputs/InputWrapper";
import {Map, YMaps} from "@pbe/react-yandex-maps";
import GrayBorderedBlock from "../../GrayBorderedBlock";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import SuccessWindow from "../SuccessWindow";
import {handleDeliveryVariant, handleDeliveryWayWindow} from "../../../features/modals/modalsSlice";

interface AddressItemProps {
    selected: boolean
    disabled?: boolean,
    selectedHandle?: () => void
}

const AddressItem: FC<AddressItemProps> = ({selected, selectedHandle, disabled = false}) => {
    if (disabled) {
        return (
            <GrayBorderedBlock disabled={disabled} className={`pd-20 d-f gap-10 ${styles.addressItem} `}>
                <Geo/>
                <div className={`f-column gap-5 ${styles.text}`}>
                    <h2>Энергетиков, д. 4</h2>
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
                           className={`pd-20 d-f gap-10 ${styles.addressItem} `}>
            <Geo/>
            <div className={`f-column gap-5 ${styles.text}`}>
                <h2>Энергетиков, д. 4</h2>
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
const SearchAddressItem: FC<SearchAddressItemProps> = ({address, city}) => {
    return (
        <div className={`pd-10 ${styles.searchAddressItem} f-column gap-5`}>
            <b>{address}</b>
            <p>{city}</p>
        </div>
    )
}
const DeliveryVariant = () => {
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

    useEffect(() => {

    }, [])

    return (
        <>
            <div className="f-column gap-10">
                <div className={"d-f w-100p p-rel"}>
                    <InputWrapper className={"w-100p"} placeholder={"Сургут, ул. Университетская, д. 9"} labelText={
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
                    <InputWrapper className={styles.partInputBlock} placeholder={""} labelText={
                        <div className={"d-f al-center gap-5 svgRedStroke"}>
                            Подъезд
                        </div>
                    }/>
                    <InputWrapper className={styles.partInputBlock} placeholder={""} labelText={
                        <div className={"d-f al-center gap-5 svgRedStroke"}>
                            Код двери
                        </div>
                    }/>

                </div>
                <div className="f-row-betw gap-20 flex-wrap">
                    <InputWrapper className={styles.partInputBlock} placeholder={""} labelText={
                        <div className={"d-f al-center gap-5 svgRedStroke"}>
                            Этаж
                        </div>
                    }/>
                    <InputWrapper className={styles.partInputBlock} placeholder={""} labelText={
                        <div className={"d-f al-center gap-5 svgRedStroke"}>
                            Квартира
                        </div>
                    }/>

                </div>
                <InputWrapper placeholder={"Ваш комментарий..."} labelText={
                    <div className={"d-f al-center gap-5 svgRedStroke"}>
                        Комментарий
                    </div>
                }/>
            </div>
            <RedButton disabled={false} className={"pd-10-0"}>Указать адрес доставки</RedButton>
        </>
    )
}
const addresses = [{
    name: "Адрес 1",
    disabled: false
}, {
    name: "Адрес 2",
    disabled: true
},
    {
        name: "Адрес 3",
        disabled: false
    }
]
const PickupVariant = () => {
    const [selectedAddress, setSelectedAddress] = useState(0)


    return (
        <>
            <div className={`f-column gap-10 h-100p ${styles.addressesList}`}>
                {addresses.map((item, index) => (
                    <AddressItem disabled={item.disabled} selectedHandle={() => setSelectedAddress(index)}
                                 selected={index === selectedAddress}/>
                ))}
            </div>
            <RedButton disabled={false} className={"pd-10-0"}>Выбрать</RedButton>
        </>

    )
}
const DeliveryWay = () => {
    const dispatch = useAppDispatch()
    const {variant} = useAppSelector(state => state.modals.deliveryWay)
    const handleDeliveryWay = (index: number) => {
        dispatch(handleDeliveryVariant(index))
    }

    return (
        <ShadowWrapper>
            <SuccessWindow isOpened={false} title={"Ваш адрес успешно добавлен!"}/>
            <WindowBody className={`${styles.window} f-row-betw p-rel`}>
                <div onClick={() => {dispatch(handleDeliveryWayWindow())}} className={"modalAbsoluteClose closeWrapper p-abs"}>
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
                            <DeliveryVariant/> :
                            <PickupVariant/>

                    }

                </div>
                <div className={styles.map}>
                    <YMaps>
                        <Map className={"h-100p w-100p"}
                             state={{center: [0, 9], zoom: 9}}/>
                    </YMaps>
                </div>
            </WindowBody>
        </ShadowWrapper>
    );
};

export default DeliveryWay;