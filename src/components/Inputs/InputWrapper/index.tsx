import React, {ChangeEvent, Dispatch, FC, ReactNode, SetStateAction, useState} from 'react';
import GrayBorderedBlock from "../../GrayBorderedBlock";
import styles from "./inputWrapper.module.scss"
import {CloseIcon} from "../../../icons";
import {HasClassName} from "../../../types/components.types";

interface InputWrapper {
    grayBorderedClassName?: string,
    inActive?: boolean,
    btn?: ReactNode
    isFocused?: boolean,
    isPhone?: boolean
    placeholder?: string,
    errText?: string,
    inputVal?: number | string,
    labelText?: ReactNode,
    inputId?: string,
    onInputBlur?: () => void
    changeVal?: (e: ChangeEvent<HTMLInputElement>) => any,
    setVal?: (val: string) => any
}

const InputWrapper: FC<InputWrapper & HasClassName> = ({
                                                           isFocused,
                                                           isPhone,
                                                           placeholder,
                                                           setVal,
                                                           className,
                                                           onInputBlur,
                                                           grayBorderedClassName,
                                                           inputId,
                                                           labelText,
                                                           inputVal,
                                                           changeVal,
    inActive= false,
                                                           errText,
    btn
                                                       }) => {
    const [isFocusedState, setIsFocusedState] = useState<boolean>(isFocused || false)

    const handleBlur = () => {
        setIsFocusedState(false)
        if (onInputBlur) {
            onInputBlur()
        }
    }
    const handleFocus = () => {
        if(!inActive) {
            setIsFocusedState(true)
        }

    }
    const handleResetInput = () => {
        if (setVal !== undefined) {
            setVal("")
        }
    }
    if(btn) {
        return (
            <div className={"d-f al-center gap-10"}>
                <div className={`f-column gap-10 ${className}`}>
                    {labelText ? <label className={`${styles.label} ${errText ? styles.errorTextColor : null}`}
                                        htmlFor={inputId}>{labelText}</label> : null}
                    <div className="d-f al-center gap-10">

                        <GrayBorderedBlock disabled={inActive} validError={errText} isFocused={isFocused} className={`${grayBorderedClassName || ""} f-row-betw inputField`}>
                            <input readOnly={inActive} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                                   value={inputVal || (isPhone ? "+7" : "")} onChange={changeVal} className={`${styles.input} f-1`}
                                   id={inputId} type="text"/>
                            {
                                inputVal ? <div className={`${styles.close} h-100p cur-pointer visible f-c-col`}>


                                </div> : null
                            }
                            {btn || null}

                        </GrayBorderedBlock>
                        {isFocusedState ?<div onClick={handleResetInput} style={{width: "fit-content", height: "fit-content"}}>
                            <CloseIcon/>
                        </div> : null
                        }

                    </div>

                </div>

            </div>

        )
    }
    return (
        <div className={`f-column gap-10 ${className}`}>
            {labelText ? <label className={`${styles.label} ${errText ? styles.errorTextColor : null}`}
                                htmlFor={inputId}>{labelText}</label> : null}
            <GrayBorderedBlock validError={errText} isFocused={isFocusedState} className={"f-row-betw inputField"}>
                <input placeholder={placeholder || ""} onBlur={handleBlur} onFocus={() => setIsFocusedState(true)}
                       value={inputVal || (isPhone ? "+7" : "")} onChange={changeVal} className={`${styles.input} f-1`}
                       id={inputId} type="text"/>
                {
                    inputVal ? <div className={`${styles.close} h-100p cur-pointer visible f-c-col`}>
                        <div onClick={handleResetInput} style={{width: "fit-content", height: "fit-content"}}>
                            <CloseIcon/>
                        </div>

                    </div> : null
                }

            </GrayBorderedBlock>
        </div>
    );

};

export default InputWrapper;