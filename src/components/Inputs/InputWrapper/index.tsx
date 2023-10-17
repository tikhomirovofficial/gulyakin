import React, {ChangeEvent, Dispatch, FC, ReactNode, SetStateAction, useState} from 'react';
import GrayBorderedBlock from "../../GrayBorderedBlock";
import styles from "./inputWrapper.module.scss"
import {CloseIcon, LockedIcon} from "../../../icons";
import {HasClassName} from "../../../types/components.types";

interface InputWrapper {
    grayBorderedClassName?: string,
    inActive?: boolean,
    disabled?: boolean,
    btn?: ReactNode,
    isFocused?: boolean,
    isPhone?: boolean
    placeholder?: string,
    errText?: string,
    locked?: boolean,
    inputVal?: number | string,
    labelText?: ReactNode,
    inputId?: string,
    onInputBlur?: () => void,
    isTextArea?: boolean,
    changeVal?: (e: ChangeEvent<HTMLInputElement>) => any,
    textChangeVal?: (e: ChangeEvent<HTMLTextAreaElement>) => any,
    isChanging?: boolean
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
    isChanging= false,
    locked = false,
    isTextArea = false,
    textChangeVal,
                                                           changeVal,

    inActive= false,
    disabled = false,
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

                        <GrayBorderedBlock disabled={inActive} validError={errText} isFocused={isFocusedState} className={`${grayBorderedClassName || ""} d-f jc-between ${!isTextArea ? "inputField f-row-betw" : styles.textArea}`}>
                            {
                                isTextArea ?  <textarea readOnly={disabled} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                                                     value={inputVal || (isPhone ? "+7" : "")} onChange={textChangeVal} className={`${styles.textField} f-1`}
                                                     id={inputId}></textarea> :
                                    <input readOnly={disabled} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                                           value={inputVal || (isPhone ? "+7" : "")} onChange={changeVal} className={`${styles.textField} f-1`}
                                           id={inputId} type="text"/>

                            }
                            {
                                inputVal ? <div className={`${styles.close} h-100p cur-pointer visible f-c-col`}>


                                </div> : null
                            }
                            {
                                locked ?
                                    <div className={"w-content f-c-col"}>
                                        <LockedIcon/>
                                    </div> :
                                    btn || null
                            }
                        </GrayBorderedBlock>
                        {isFocusedState || ( isChanging && inputVal !== "") ?<div onClick={handleResetInput} style={{width: "fit-content", height: "fit-content"}}>
                            <CloseIcon/>
                        </div> : null
                        }

                    </div>

                </div>

            </div>

        )
    }
    if(locked) {
        return (
            <div className={"d-f al-center gap-10"}>
                <div className={`f-column gap-10 ${className}`}>
                    {labelText ? <label className={`${styles.label} ${errText ? styles.errorTextColor : null}`}
                                        htmlFor={inputId}>{labelText}</label> : null}
                    <div className="d-f al-center gap-10">

                        <GrayBorderedBlock disabled={true} validError={errText} isFocused={isFocusedState} className={`${grayBorderedClassName || ""} f-row-betw inputField`}>
                            <input readOnly={true} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                                   value={inputVal || (isPhone ? "+7" : "")} onChange={changeVal} className={`${styles.textField} f-1`}
                                   id={inputId} type="text"/>
                            {
                                inputVal ? <div className={`${styles.close} h-100p cur-pointer visible f-c-col`}>
                                </div> : null
                            }
                            <div className={`w-content f-c-col`}>
                                <LockedIcon/>
                            </div>
                        </GrayBorderedBlock>
                        {isFocusedState || ( isChanging && inputVal !== "") ?<div onClick={handleResetInput} style={{width: "fit-content", height: "fit-content"}}>
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
            <GrayBorderedBlock validError={errText} isFocused={isFocusedState} className={`d-f jc-between ${!isTextArea ? "inputField f-row-betw" : styles.textArea}`}>
                {
                    isTextArea ?  <textarea readOnly={disabled} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                                            value={inputVal || (isPhone ? "+7" : "")} onChange={textChangeVal} className={`${styles.textField} f-1`}
                                            id={inputId}></textarea> :
                        <input readOnly={disabled} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                               value={inputVal || (isPhone ? "+7" : "")} onChange={changeVal} className={`${styles.input} f-1`}
                               id={inputId} type="text"/>

                }
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