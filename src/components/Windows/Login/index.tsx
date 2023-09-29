import React, {ChangeEvent, createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import WindowBody from "../WhiteWrapper";
import ShadowWrapper from "../ShadowWrapper";
import {CloseIcon} from "../../../icons";
import styles from "./login.module.scss"
import GrayBorderedBlock from "../../GrayBorderedBlock";
import RedButton from "../../Buttons/RedButton";
import {useInput} from "../../../hooks/useInput";
import InputWrapper from "../../Inputs/InputWrapper";
import {useAppDispatch} from "../../../app/hooks";
import {handleLogin} from "../../../features/modals/modalsSlice";

const CODE_LENGTH = 4

const LoginPhoneStep = () => {
    const {changePhone, phoneErr, phone, setLoginStep, setPhoneErr, setPhone} = useContext<LoginContextType>(LoginContext)


    return (
        <div className="gap-30 f-column">
            <div className="f-column gap-10">
                <h2>Войдите на сайт</h2>
                <p className={styles.caption}>
                    Чтобы сохранить адрес доставки и узнать об акциях
                </p>
            </div>
            <div className="f-column gap-20">
                <div className="f-column gap-10">
                    <InputWrapper isPhone={true} setVal={setPhone} onInputBlur={() => setPhoneErr("")} errText={phoneErr} labelText={"Номер телефона"}
                                  inputId={"phone"} inputVal={phone} changeVal={changePhone}/>
                </div>
                <div className="f-column gap-15">
                    <RedButton onClick={() => setLoginStep(1)} disabled={false} className={"pd-10-0"}>Выслать
                        код</RedButton>
                    <div className={"caption txt-center"}>Продолжая, вы соглашаетесь <a href=""> со сбором и
                        обработкой персональных данных и пользовательским соглашением</a></div>
                </div>

            </div>

        </div>
    )
}
const LoginCodeStep = () => {
    const {setLoginStep, code, setCode, codeErr} = useContext<LoginContextType>(LoginContext)
    const [currentDigit, setCurrentDigit] = useState<number | null>(null)

    useEffect(() => {
        console.log(code)
    },[code])

    const handleChangeCodes = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        if(e.target.value == "" || (e.target.value.length < 2 && RegExp(/[0-9]/).test(e.target.value))) {

            setCode(prev => {
                const newArr = [...prev]
                newArr[index] = e.target.value

                const prevLength = prev.join("").length
                const newLength = newArr.join("").length
                const digitsListNode = e.target.parentElement?.parentElement
                
                if(prevLength < newLength && index < CODE_LENGTH - 1) {
                    const nextInput = digitsListNode?.children[index + 1].querySelector("input") as HTMLInputElement
                    nextInput.focus()
                }

                if(prevLength > newLength && index != 0) {
                    const prevInput = digitsListNode?.children[index - 1].querySelector("input") as HTMLInputElement
                    prevInput.focus()
                }
                return newArr
            })
        }

    }

    return (
        <div className="gap-30 f-column">
            <div className="f-column gap-10">
                <h2>Войдите на сайт</h2>
                <div className={"f-column"}>
                    <p className={styles.caption}>
                        Код отправили сообщением на
                    </p>
                    <div className="d-f gap-10">
                        <b>+7 (951) 735-89-45</b>
                        <b onClick={() => setLoginStep(0)} className={styles.changePhone}>Изменить</b>
                    </div>

                </div>

            </div>
            <div className="f-column gap-20">
                <div className="f-column al-center gap-5">
                    <div className="d-f jc-center gap-10">
                        {
                            code.map((digit, index) => (
                                <GrayBorderedBlock isFocused={currentDigit === index} className={`${styles.codeDigitBlock} f-c-col`}><input onBlur={() => setCurrentDigit(null)} onFocus={() => setCurrentDigit(index)} className={styles.codeInput} onChange={(e) => handleChangeCodes(e, index)} value={digit}
                                                                type="text"/></GrayBorderedBlock>
                            ))
                        }


                    </div>
                    {codeErr ?
                        <div className={"validationErr fw-7"}>{codeErr}</div>
                        : null
                    }

                </div>

                <div className="f-column gap-15">
                    <RedButton disabled={false} className={"pd-10-0"}>Получить новый код</RedButton>
                    <div className={"caption txt-center"}>Продолжая, вы соглашаетесь <a href=""> со сбором и
                        обработкой персональных данных и пользовательским соглашением</a></div>
                </div>

            </div>

        </div>
    )
}

interface LoginContextType {
    setLoginStep: React.Dispatch<React.SetStateAction<number>>,
    phone: string,
    code: Array<string>
    codeErr: string
    phoneErr: string
    changePhone: (e: ChangeEvent<HTMLInputElement>) => void,
    setCode: Dispatch<SetStateAction<Array<string>>>,
    setCodeErr: Dispatch<SetStateAction<string>>,
    setPhone: Dispatch<SetStateAction<string>>,
    setPhoneErr: Dispatch<SetStateAction<string>>,

}

const loginContextDefault = {
    setLoginStep: () => {
    },
    code: ["", "", "", ""],
    codeErr: "",
    phone: "",
    phoneErr: "",
    setCode(value: ((prevState: Array<string>) => Array<string>) | Array<string>): void {
    },
    setCodeErr(value: ((prevState: string) => string) | string): void {
    },
    changePhone(e: React.ChangeEvent<HTMLInputElement>): void {
    },
    setPhoneErr(value: ((prevState: string) => string) | string): void {
    },
    setPhone(value: ((prevState: string) => string) | string): void {
    }

}
const LoginContext = createContext<LoginContextType>(loginContextDefault)

const loginSteps = [LoginPhoneStep, LoginCodeStep]
const LoginWindow = () => {
    const [loginStep, setLoginStep] = useState<number>(0)
    const CurrentStep = loginSteps[loginStep]

    const [phoneVal, changePhone, setPhone] = useInput(loginContextDefault.phone)
    const [codeVal, setCode] = useState<Array<string>>(loginContextDefault.code)

    const [phoneErr, setPhoneErr] = useState<string>(loginContextDefault.phoneErr)
    const [codeErr, setCodeErr] = useState<string>(loginContextDefault.codeErr)

    const dispatch = useAppDispatch()
    return (
        <LoginContext.Provider value={{
            setLoginStep,
            phone: phoneVal,
            code: codeVal,
            phoneErr: phoneErr,
            codeErr: codeErr,
            changePhone: changePhone,
            setCode: setCode,
            setCodeErr: setCodeErr,
            setPhoneErr: setPhoneErr,
            setPhone: setPhone

        }}>
            <ShadowWrapper>
                <WindowBody className={`${styles.window} f-column`}>
                    <div className="w-100p d-f jc-end">
                        <div onClick={() => dispatch(handleLogin())} className={"closeWrapper"}>
                            <CloseIcon isDark={true}/>
                        </div>
                    </div>
                    <CurrentStep/>
                </WindowBody>
            </ShadowWrapper>
        </LoginContext.Provider>

    );
};

export default LoginWindow;