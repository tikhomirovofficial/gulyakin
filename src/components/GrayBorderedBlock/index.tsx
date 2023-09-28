import React, {FC} from 'react';
import styles from './grayBorderBlock.module.scss'
import {HasChildrenProps, HasClassName} from "../../types/components.types";
interface GrayBorderedBlock {
    isIncorrectStyle?: boolean
    isFocused?: boolean
    validError?: string,
    clickHandler?: () => void
}
const GrayBorderedBlock: FC<HasChildrenProps & HasClassName & GrayBorderedBlock> = ({className, clickHandler, validError, isFocused, children}) => {
    return (
        <div onClick={clickHandler} className={`${styles.block} ${validError ? styles.error : ""} ${isFocused ? styles.focused: ""} ${className || null}`}>
            {children}
        </div>
    );
};

export default GrayBorderedBlock;