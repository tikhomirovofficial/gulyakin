import React, {FC, ReactNode} from 'react';
import styles from "./successWindow.module.scss"
import WhiteWrapper from "../WhiteWrapper";
import {SuccessGreenIcon} from "../../../icons";

interface SuccessWindowProps {
    isOpened: boolean
    title: string
    closeHandle: () => any
    bottomContent?: ReactNode
}
const SuccessWindow: FC<SuccessWindowProps> = ({title, bottomContent= null, closeHandle,  isOpened}) => {
    return (
        <div onClick={closeHandle} className={`${styles.successWindow} ${isOpened? styles.successWindowOpened : ""} t-opacity-visible-transform-3 h-100v w-100v p-fix top-0 left-0 f-c-col`}>
            <WhiteWrapper className={`${styles.container} f-column al-center gap-20`}>
                <h1>{title}</h1>
                <SuccessGreenIcon/>
                {bottomContent}
            </WhiteWrapper>

        </div>
    );
};

export default SuccessWindow;