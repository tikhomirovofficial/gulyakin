import React, {ChangeEvent, Dispatch, FC, SetStateAction, useState} from 'react';
import GrayBorderedBlock from "../../GrayBorderedBlock";
import styles from "./inputWrapper.module.scss"
import {CloseIcon} from "../../../icons";
import {HasClassName} from "../../../types/components.types";

interface InputWrapper {
    isFocused?: boolean
    errText?: string,
    inputVal?: number | string,
    labelText?: string,
    inputId?: string,
    onInputBlur?: () => void
    changeVal?: (e: ChangeEvent<HTMLInputElement>) => any,
    setVal?: Dispatch<SetStateAction<string>>
}
const InputWrapper: FC<InputWrapper & HasClassName> = ({isFocused, setVal, className, onInputBlur, inputId , labelText, inputVal, changeVal, errText}) => {
    const [isFocusedState, setIsFocusedState] = useState<boolean>(isFocused || false)

    const handleBlur = () => {
        setIsFocusedState(false)
        if(onInputBlur) {
            onInputBlur()
        }
    }
    const handleResetInput = () => {
        if(setVal !== undefined) {
            setVal("")
        }
    }
    return (
        <>
            {labelText ?<label className={`${errText ? styles.errorTextColor : null}`} htmlFor={inputId}>{labelText}</label> : null}
            <GrayBorderedBlock validError={errText} isFocused={isFocusedState} className={"f-row-betw inputField"}>
                <input onBlur={handleBlur}  onFocus={() => setIsFocusedState(true)} value={inputVal || ""} onChange={changeVal} className={"f-1"} id={inputId} type="text"/>
                {
                    inputVal ? <div className={`${styles.close} h-100p cur-pointer visible f-c-col`}>
                        <div onClick={handleResetInput} style={{width: "fit-content", height: "fit-content"}}>
                            <CloseIcon/>
                        </div>

                    </div> : null
                }

            </GrayBorderedBlock>
        </>
    );

};

export default InputWrapper;