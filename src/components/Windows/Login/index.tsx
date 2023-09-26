import React, {createContext, useContext, useState} from 'react';
import WindowBody from "../WhiteWrapper";
import ShadowWrapper from "../ShadowWrapper";
import {CloseIcon} from "../../../icons";
import styles from "./login.module.scss"
import GrayBorderedBlock from "../../GrayBorderedBlock";
import RedButton from "../../Buttons/RedButton";


const LoginPhoneStep = () => {
    const {setLoginStep} = useContext<LoginContextType>(LoginContext)

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
                    <label htmlFor="login-phone">Номер телефона</label>
                    <GrayBorderedBlock className={"f-row-betw"}>
                        <input className={"f-1"} id={"login-phone"} type="text"/>
                        <div className={`${styles.close} cur-pointer visible f-c-col`}>
                            <CloseIcon/>
                        </div>
                    </GrayBorderedBlock>
                </div>
                <div className="f-column gap-15">
                    <RedButton onClick={() => setLoginStep(1)} disabled={false} className={"pd-10-0"}>Выслать код</RedButton>
                    <div className={"caption txt-center"}>Продолжая, вы соглашаетесь <a href=""> со сбором и
                        обработкой персональных данных и пользовательским соглашением</a></div>
                </div>

            </div>

        </div>
    )
}
const LoginCodeStep = () => {
    const {setLoginStep} = useContext<LoginContextType>(LoginContext)
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
                        <GrayBorderedBlock className={`${styles.codeDigitBlock} f-c-col`}><input maxLength={1} className={styles.codeInput} type="text"/></GrayBorderedBlock>
                        <GrayBorderedBlock className={`${styles.codeDigitBlock} f-c-col`}><input maxLength={1} className={styles.codeInput} type="text"/></GrayBorderedBlock>
                        <GrayBorderedBlock className={`${styles.codeDigitBlock} f-c-col`}><input maxLength={1} className={styles.codeInput} type="text"/></GrayBorderedBlock>
                        <GrayBorderedBlock className={`${styles.codeDigitBlock} f-c-col`}><input maxLength={1} className={styles.codeInput} type="text"/></GrayBorderedBlock>
                    </div>
                    <div className={"validationErr fw-7"}>Неверный код</div>
                </div>

                <div className="f-column gap-15">
                    <RedButton disabled={false} className={"pd-10-0"}>Получить новый код через 55 сек.</RedButton>
                    <div className={"caption txt-center"}>Продолжая, вы соглашаетесь <a href=""> со сбором и
                        обработкой персональных данных и пользовательским соглашением</a></div>
                </div>

            </div>

        </div>
    )
}

interface LoginContextType {
    setLoginStep: React.Dispatch<React.SetStateAction<number>>,

}
const LoginContext = createContext<LoginContextType>({
    setLoginStep: () => {},
})
const loginSteps = [LoginPhoneStep, LoginCodeStep]
const LoginWindow = () => {
    const [loginStep, setLoginStep] = useState<number>(0)
    const CurrentStep = loginSteps[loginStep]

    return (
        <LoginContext.Provider value={{
            setLoginStep
        }}>
            <ShadowWrapper>
                <WindowBody className={`${styles.window} f-column`}>
                    <div className="w-100p d-f jc-end"><CloseIcon isDark={true}/></div>
                    <CurrentStep/>
                </WindowBody>
            </ShadowWrapper>
        </LoginContext.Provider>

    );
};

export default LoginWindow;