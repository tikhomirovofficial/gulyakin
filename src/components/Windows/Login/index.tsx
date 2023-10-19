import React, {ChangeEvent, createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import WindowBody from "../WhiteWrapper";
import ShadowWrapper from "../ShadowWrapper";
import {CloseIcon, Preloader} from "../../../icons";
import styles from "./login.module.scss"
import GrayBorderedBlock from "../../GrayBorderedBlock";
import RedButton from "../../Buttons/RedButton";
import {useInput} from "../../../hooks/useInput";
import InputWrapper from "../../Inputs/InputWrapper";
import {useAppDispatch} from "../../../app/hooks";
import {handleLogin} from "../../../features/modals/modalsSlice";
import InputMask from 'react-input-mask';
import {UserApi} from "../../../http/api/user.api";
import {extractDigits} from "../../../utils/normalizePhone";
import {storeTokens} from "../../../utils/storeTokens";
import {useNavigate} from "react-router-dom";
import authApi from "../../../http/instance/instances";
import {withChangeCodeArr} from "../../../utils/forms/withChangeCodeArr";
import {useInterval} from "../../../hooks/useInterval";




const LoginPhoneStep = () => {
    const {changePhone, phoneErr, phone, setCode, code, codeErr, setCodeErr, setLoginStep, setPhoneErr, setPhone} = useContext<LoginContextType>(LoginContext)
    const handleSendPhone = async () => {
        const {status} = await UserApi.Registration({
            phone: extractDigits(phone)
        })

        if(status) {
            const codeIsFilled =  code.some(item => item !== "")

            if(codeIsFilled) {
                setCode(["", "", "", ""])
            }
            if(codeErr) {
                setCodeErr("")
            }
            setLoginStep(1)
        }


    }

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
                    <InputWrapper placeholder={"+7"}  mask={"+7(999) 999 99-99"} isPhone={true} setVal={setPhone} onInputBlur={() => setPhoneErr("")} errText={phoneErr} labelText={"Номер телефона"}
                                  inputId={"phone"} inputVal={phone} changeVal={changePhone}/>
                </div>
                <div className="f-column gap-15">
                    <RedButton onClick={handleSendPhone} disabled={phone.includes("_") || phone.length < 1} className={"pd-10-0"}>Выслать
                        код</RedButton>
                    <div className={"caption txt-center"}>Продолжая, вы соглашаетесь <a href=""> со сбором и
                        обработкой персональных данных и пользовательским соглашением</a></div>
                </div>

            </div>

        </div>
    )
}
const LoginCodeStep = () => {
    const navigate = useNavigate()
    const {setLoginStep, isFreezed, code, setCode, setIsFreezed, codeErr, codeLoading, setFreezedSecs, codeFreezedSeconds, phone, setCodeLoading, setCodeErr} = useContext<LoginContextType>(LoginContext)
    const [currentDigit, setCurrentDigit] = useState<number | null>(null)
    const freezed = codeFreezedSeconds !== undefined && codeFreezedSeconds > 0 && isFreezed
    const dispatch = useAppDispatch()
    const handleSendPhone = async () => {
        const {status} = await UserApi.Registration({
            phone: extractDigits(phone)
        })

        if(status) {
            const codeIsFilled =  code.some(item => item !== "")

            if(codeIsFilled) {
                setCode(["", "", "", ""])
            }
            if(codeErr) {
                setCodeErr("")
            }
        }


    }
    const handleChangeCodes = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const validSymbolAndValue = e.target.value == "" || (e.target.value.length < 2 && RegExp(/[0-9]/).test(e.target.value))

        if(validSymbolAndValue) {
            setCodeErr("")
            setCode(prev => {
                const digitsListNode = e.target.parentElement?.parentElement
                return withChangeCodeArr({
                    prevCodeArr: prev,
                    value: e.target.value,
                    codeListNode: digitsListNode,
                    index
                })

            })
        }
    }
    const handleNewCode =  () => {
        if(!isFreezed) {
            handleSendPhone()
            setIsFreezed(true)
            setFreezedSecs(5)
            setCode(["", "", "", ""])

            return;
        }
    }
    useEffect(() => {
         (async () => {
            const codeIsFilled = code.every(item => item !== "")

            if(codeIsFilled) {
                try {
                    setCodeLoading(true)
                    const {access, refresh, detail} = await UserApi.Login({
                        username: extractDigits(phone),
                        password: code.join("")
                    })
                    storeTokens({
                        access,
                        refresh
                    })
                    alert(access)
                    authApi.defaults.headers["Authorization"] = `Bearer ${access}`
                    dispatch(handleLogin())
                    navigate("/profile")
                }
                catch (e: any) {
                    setCodeErr("Неверный код")
                }
                finally {
                    setCodeLoading(false)
                }
            }
        })()

    }, [code])

    return (
        <div className="gap-30 f-column">
            <div className="f-column gap-10">
                <h2>Войдите на сайт</h2>
                <div className={"f-column"}>
                    <p className={styles.caption}>
                        Код отправили сообщением на
                    </p>
                    <div className="d-f gap-10">
                        <b>{phone}</b>
                        <b onClick={() => setLoginStep(0)} className={styles.changePhone}>Изменить</b>
                    </div>

                </div>

            </div>
            <div className="f-column gap-20">
                <div className="f-column al-center gap-5">
                    <div className="d-f jc-center gap-10">
                        {
                            code.map((digit, index) => (
                                <GrayBorderedBlock validError={codeErr} isFocused={currentDigit === index} className={`${styles.codeDigitBlock} f-c-col`}><input onBlur={() => setCurrentDigit(null)} onFocus={() => setCurrentDigit(index)} className={styles.codeInput} onChange={(e) => handleChangeCodes(e, index)} value={digit}
                                                                type="text"/></GrayBorderedBlock>
                            ))
                        }


                    </div>
                    {
                        codeLoading ?
                        <div className={`${styles.codePreloader} ${styles.codeStatusCaption} d-f al-center gap-5`}>
                            <b>Проверяем код</b>
                            <div className="f-c-col infiniteSpin w-content h-content">
                                <Preloader/>
                            </div>

                        </div> : null
                    }
                    {codeErr.length ?
                        <div className={`validationErr fw-7 ${styles.codeStatusCaption} `}>{codeErr}</div>
                        : null
                    }

                </div>

                <div className="f-column gap-15">
                    <RedButton onClick={handleNewCode} disabled={freezed} className={"pd-10-0"}>
                        Получить новый код {freezed ? `через ${codeFreezedSeconds} сек` : ""}
                    </RedButton>
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
    isFreezed: boolean
    phoneErr: string,
    codeFreezedSeconds?: number,
    codeLoading: boolean,
    changePhone: (e: ChangeEvent<HTMLInputElement>) => void,
    setCode: Dispatch<SetStateAction<Array<string>>>,
    setFreezedSecs: Dispatch<SetStateAction<number>>,
    setIsFreezed: Dispatch<SetStateAction<boolean>>,
    setCodeErr: Dispatch<SetStateAction<string>>,
    setPhone: Dispatch<SetStateAction<string>>,
    setPhoneErr: Dispatch<SetStateAction<string>>,
    setCodeLoading: Dispatch<SetStateAction<boolean>>

}

const loginContextDefault = {
    setLoginStep: () => {
    },
    code: ["", "", "", ""],
    codeErr: "",
    phone: "",
    codeLoading: false,
    phoneErr: "",
    isFreezed: false,
    setCode(value: ((prevState: Array<string>) => Array<string>) | Array<string>): void {
    },
    setCodeErr(value: ((prevState: string) => string) | string): void {
    },
    changePhone(e: React.ChangeEvent<HTMLInputElement>): void {
    },
    setPhoneErr(value: ((prevState: string) => string) | string): void {
    },
    setPhone(value: ((prevState: string) => string) | string): void {
    },
    setCodeLoading(value: ((prevState: boolean) => boolean) | boolean): void {},
    setIsFreezed(value: ((prevState: boolean) => boolean) | boolean): void {},
    setFreezedSecs(value: ((prevState: number) => number) | number): void {},
}

const LoginContext = createContext<LoginContextType>(loginContextDefault)
const loginSteps = [LoginPhoneStep, LoginCodeStep]

const LoginWindow = () => {
    const [loginStep, setLoginStep] = useState<number>(0)
    const CurrentStep = loginSteps[loginStep]

    const [phoneVal, changePhone, setPhone] = useInput(loginContextDefault.phone)
    const [codeVal, setCode] = useState<Array<string>>(loginContextDefault.code)
    const [codeLoading, setCodeLoading] = useState<boolean>(loginContextDefault.codeLoading)
    const [isFreezed, setIsFreezed] = useState<boolean>(loginContextDefault.codeLoading)
    const [codeFreezedSecs, setCodeFreezedSecs] = useState(0)

    const [phoneErr, setPhoneErr] = useState<string>(loginContextDefault.phoneErr)
    const [codeErr, setCodeErr] = useState<string>(loginContextDefault.codeErr)

    useInterval(() => {
        if (isFreezed && codeFreezedSecs > 0) {
            setCodeFreezedSecs((prev) => prev - 1);
        } else {
            setIsFreezed(false);
            setCodeFreezedSecs(0);
        }
    }, 1000);

    const dispatch = useAppDispatch()
    return (
        <LoginContext.Provider value={{
            setLoginStep,
            isFreezed: isFreezed,
            setIsFreezed: setIsFreezed,
            phone: phoneVal,
            code: codeVal,
            codeLoading: codeLoading,
            phoneErr: phoneErr,
            codeErr: codeErr,
            codeFreezedSeconds: codeFreezedSecs,
            changePhone: changePhone,
            setCode: setCode,
            setFreezedSecs: setCodeFreezedSecs,
            setCodeErr: setCodeErr,
            setPhoneErr: setPhoneErr,
            setPhone: setPhone,
            setCodeLoading: setCodeLoading

        }}>
            <ShadowWrapper onClick={() => dispatch(handleLogin())}>
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