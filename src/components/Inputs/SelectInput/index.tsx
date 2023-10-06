import React, {
    ChangeEvent,
    Dispatch,
    FC,
    MouseEventHandler,
    ReactNode,
    SetStateAction,
    useEffect,
    useRef,
    useState
} from 'react';
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
    labelText?: ReactNode,
    onInputBlur?: () => void
    changeVal?: (e: ChangeEvent<HTMLInputElement>) => any,
    setVal?: Dispatch<SetStateAction<string>>
}
const SelectInput: FC<SelectInputWrapper & HasClassName> = ({isEmpty= true, defaultCurrent, selectHandler, isFocused, items, className,  labelText, errText}) => {
    const [selected, setSelected] = useState<number>((defaultCurrent != undefined ? defaultCurrent : -1))
    const [focused, setIsFocused] = useState<boolean>(isFocused || false)

    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectInputRef = useRef<HTMLDivElement>(null);
    const toggleFocused = () => setIsFocused(!focused)

    const handleSelected = (val: number) => {
        setSelected(val)
        selectHandler(val)
    }

    const handleClickOutside = (e: any) => {

        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            if(selectInputRef.current && !selectInputRef.current.contains(e.target)) {
                setIsFocused(false)
            }

        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])
    return (
        <div ref={selectInputRef} className={`f-column gap-10 ${className}`}>
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
                    <div ref={dropdownRef} className={"w-100p p-abs left-0 dropDown pd-20"}>
                        <DropdownList classNameItem={"f-row-betw "} className={"  f-column gap-5 bg-white w-100p"} items={items} current={selected} selectHandler={(current) => handleSelected(current)}/>
                    </div>
                    : null
                }
            </GrayBorderedBlock>
        </div>
    );

};

export default SelectInput;