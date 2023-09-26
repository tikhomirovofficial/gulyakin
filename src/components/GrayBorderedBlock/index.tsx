import React, {FC} from 'react';
import styles from './grayBorderBlock.module.scss'
import {HasChildrenProps, HasClassName} from "../../types/components.types";
interface GrayBorderedBlock {
    isIncorrectStyle?: boolean
}
const GrayBorderedBlock: FC<HasChildrenProps & HasClassName & GrayBorderedBlock> = ({className, children}) => {
    return (
        <div className={`${styles.block} ${className || null}`}>
            {children}
        </div>
    );
};

export default GrayBorderedBlock;