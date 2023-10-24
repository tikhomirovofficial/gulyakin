import React, {
    ChangeEvent,
    Dispatch,
    FC,
    HTMLInputTypeAttribute,
    ReactNode,
    SetStateAction, useEffect,
    useRef,
    useState
} from 'react';
import GrayBorderedBlock from "../../GrayBorderedBlock";
import styles from "./inputWrapper.module.scss"
import {CloseIcon, LockedIcon} from "../../../icons";
import {HasClassName} from "../../../types/components.types";
import InputMask from "react-input-mask";

interface InputWrapper {
    grayBorderedClassName?: string,
    inputClassName?: string,
    inActive?: boolean,
    maskPlaceholder?: string,
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
    inputType?: HTMLInputTypeAttribute
    postFix?: string,
    onInputBlur?: () => void,
    onInputFocus?: () => void,
    isTextArea?: boolean,
    changeVal?: (e: ChangeEvent<HTMLInputElement>) => any,
    textChangeVal?: (e: ChangeEvent<HTMLTextAreaElement>) => any,
    isChanging?: boolean
    setVal?: (val: string) => any,
    mask?: string
}

const InputWrapper: FC<InputWrapper & HasClassName> = ({
                                                           isFocused,
                                                           isPhone,
    inputClassName,
                                                           placeholder,
                                                           setVal,
                                                           className,
                                                           onInputBlur,
                                                           grayBorderedClassName,
    maskPlaceholder,
                                                           inputId,
    inputType = "text",
                                                           labelText,
                                                           inputVal,
    mask,
    postFix,
    onInputFocus,
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
    const inputRef = useRef<HTMLInputElement>(null)

    const handleBlur = () => {
        if(btn) {
            if(!inActive && !disabled) {
                setIsFocusedState(false)
                if (onInputBlur) {
                    onInputBlur()
                }
            }
        } else {
            setIsFocusedState(false)
            if (onInputBlur) {
                onInputBlur()
            }
        }



    }
    const handleFocus = () => {
        if(btn) {
            if(!inActive && !disabled) {
                if(!isChanging) {
                    if(onInputFocus) {
                        onInputFocus()
                    }
                }
                setIsFocusedState(true)
            }
        } else {
            setIsFocusedState(true)
            if(onInputFocus) {
                onInputFocus()
            }
        }


    }
    const handleResetInput = () => {
        if (setVal !== undefined) {
            setVal("")
        }
    }
    useEffect(() => {
        console.log(maskPlaceholder)
    })
    if(btn) {
        console.log(placeholder, `Фокус ${isFocusedState} Изменяется ${isChanging} Пустое ${inputVal === ""}`)
        return (
            <div className={`d-f al-center gap-10`}>
                <div className={`f-column gap-10 ${className}`}>
                    {labelText ? <label className={`${styles.label} ${errText ? styles.errorTextColor : null}`}
                                        htmlFor={inputId}>{labelText}</label> : null}
                    <div className={`d-f ${isTextArea ? "" : "al-center"} gap-10`}>

                        <GrayBorderedBlock disabled={inActive} validError={errText} isFocused={isFocusedState} className={`${grayBorderedClassName || ""} d-f jc-between ${!isTextArea ? "inputField f-row-betw" : styles.textArea}`}>
                            {
                                isTextArea ?  <textarea readOnly={disabled} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                                                     value={inputVal || (isPhone ? "+7" : "")} onChange={textChangeVal} className={`${styles.textField} f-1`}
                                                     id={inputId}></textarea> :
                                    !mask && isChanging ?
                                        <input readOnly={disabled} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                                               value={inputVal} onChange={changeVal} className={`${styles.input} f-1 ${inputClassName || ""}`}
                                               id={inputId} type={inputType}/> :
                                        <InputMask maskPlaceholder={maskPlaceholder} mask={mask || ""} readOnly={disabled} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                                                   value={inputVal} onChange={changeVal} className={`${styles.input} f-1 ${inputClassName || ""}`}
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
                                    btn
                            }
                        </GrayBorderedBlock>
                        {

                            !locked && (isFocusedState || ( isChanging)) ?<div onClick={handleResetInput} style={{width: "fit-content", height: "fit-content"}}>
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

                        <GrayBorderedBlock disabled={true} validError={errText} isFocused={isFocusedState} className={`${grayBorderedClassName || ""} d-f jc-between ${!isTextArea ? "inputField f-row-betw" : styles.textArea}`}>
                            <input readOnly={true} placeholder={placeholder || ""}
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
                        {!locked && (isFocusedState || ( isChanging && inputVal !== "")) ?<div onClick={handleResetInput} style={{width: "fit-content", height: "fit-content"}}>
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
            <GrayBorderedBlock validError={errText} isFocused={isFocusedState} className={`${grayBorderedClassName || ""} d-f jc-between ${!isTextArea ? "inputField f-row-betw" : styles.textArea}`}>
                {
                    isTextArea ?  <textarea readOnly={disabled} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                                            value={inputVal || (isPhone ? "+7" : "")} onChange={textChangeVal} className={`${styles.textField} f-1`}
                                            id={inputId}></textarea> :
                        !mask ?
                        <input readOnly={disabled} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                               value={inputVal} onChange={changeVal} className={`${styles.input} f-1 ${inputClassName || ""}`}
                               id={inputId} type={inputType}/> :
                            <InputMask maskPlaceholder={maskPlaceholder} mask={mask} readOnly={disabled} placeholder={placeholder || ""} onBlur={handleBlur} onFocus={handleFocus}
                                   value={inputVal} onChange={changeVal} className={`${styles.input} f-1 ${inputClassName || ""}`}
                                   id={inputId} type="text"/>

                }
                {postFix ?
                    <p style={{fontSize: 16}} className={"f-1"}>{postFix}</p>: null
                }
                {
                    inputVal ? <div className={`${styles.close} h-100p cur-pointer visible f-c-col`}>
                        <div onClick={handleResetInput} className={"f-c-col"} style={{width: "fit-content", height: "fit-content"}}>
                            <CloseIcon/>
                        </div>

                    </div> : null
                }

            </GrayBorderedBlock>
        </div>
    );

};

export default InputWrapper;