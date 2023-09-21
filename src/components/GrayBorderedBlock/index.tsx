import React, {FC} from 'react';
import styles from './grayBorderBlock.module.scss'
import {HasChildrenProps, HasClassName} from "../../types/components.types";
const GrayBorderedBlock: FC<HasChildrenProps & HasClassName> = ({className, children}) => {
    return (
        <div className={`${styles.block} ${className || null}`}>
            {children}
        </div>
    );
};

export default GrayBorderedBlock;