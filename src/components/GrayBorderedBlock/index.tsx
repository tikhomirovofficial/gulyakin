import React, {FC} from 'react';
import styles from './grayBorderBlock.module.scss'
import {HasChildrenProps, HasClassName} from "../../types/components.types";
interface GrayBorderedBlock {
    isIncorrectStyle?: boolean
    disabled?: boolean
    isFocused?: boolean
    validError?: string,
    clickHandler?: () => void
}
const GrayBorderedBlock: FC<HasChildrenProps & HasClassName & GrayBorderedBlock> = ({className, clickHandler, disabled, isIncorrectStyle, validError, isFocused, children}) => {

    if(clickHandler) {
        return (
            <div onClick={clickHandler} className={`${styles.block} ${validError ? styles.error : ""} ${!disabled && isFocused ? styles.focused: ""} ${disabled ? styles.disabled : ""} ${className || null}`}>
                {children}
            </div>
        );
    }

    return (
        <div className={`${styles.block} ${validError ? styles.error : ""} ${!disabled && isFocused ? styles.focused: ""} ${disabled ? styles.disabled : ""} ${className || null}`}>
            {children}
        </div>
    );
};

export default GrayBorderedBlock;