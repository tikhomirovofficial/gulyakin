import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import GrayBorderedBlock from "../../GrayBorderedBlock";
import styles from "./inputWrapper.module.scss"
import {ArrowMiniDown, ArrowMiniRightIcon, CloseIcon} from "../../../icons";
import {HasClassName} from "../../../types/components.types";
import DropdownList from "../../DropdownList";

interface SelectInputWrapper {
    selectHandler: (val: number) => void,
    defaultCurrent?: number,
    items: Array<string>
    isEmpty?: boolean
    isFocused?: boolean
    errText?: string,
    inputVal?: number | string,
    labelText?: string,
    onInputBlur?: () => void
    changeVal?: (e: ChangeEvent<HTMLInputElement>) => any,
    setVal?: Dispatch<SetStateAction<string>>
}
const SelectInput: FC<SelectInputWrapper & HasClassName> = ({isEmpty= true, defaultCurrent, selectHandler, isFocused, items, className,  labelText, errText}) => {
    const [selected, setSelected] = useState<number>((defaultCurrent != undefined ? defaultCurrent : -1))
    const [focused, setIsFocused] = useState<boolean>(isFocused || false)
    const handleSelected = (val: number) => {
        setSelected(val)
        selectHandler(val)
    }
    const toggleFocused = () => setIsFocused(!focused)

    return (
        <div className={`f-column gap-10 ${className}`}>
            {labelText ? <label className={`${errText ? styles.errorTextColor : null}`}>{labelText}</label> : null}
            <GrayBorderedBlock clickHandler={toggleFocused} validError={errText} isFocused={focused} className={"f-row-betw inputField p-rel cur-pointer"}>
                {
                    selected < 0 ?
                    <p className={"inactiveColor"}>Пусто</p> :
                        <p>{items[selected]}</p>
                }
                {
                    focused ? <ArrowMiniDown/> :  <ArrowMiniRightIcon/>
                }


                {focused ?
                    <DropdownList classNameItem={"f-row-betw "} className={"p-abs dropDown pd-20 left-0 f-column gap-5 bg-white w-100p"} items={items} current={selected} selectHandler={(current) => handleSelected(current)}/> : null
                }
            </GrayBorderedBlock>
        </div>
    );

};

export default SelectInput;