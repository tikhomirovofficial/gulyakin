import React, {FC} from 'react';
import styles from './grayBorderBlock.module.scss'
import {HasChildrenProps, HasClassName} from "../../types/components.types";
interface GrayBorderedBlock {
    isIncorrectStyle?: boolean
    isFocused?: boolean
    validError?: string
}
const GrayBorderedBlock: FC<HasChildrenProps & HasClassName & GrayBorderedBlock> = ({className, validError, isFocused, children}) => {
    return (
        <div className={`${styles.block} ${validError ? styles.error : ""} ${isFocused ? styles.focused: ""} ${className || null}`}>
            {children}
        </div>
    );
};

export default GrayBorderedBlock;