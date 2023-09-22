import React, {FC} from 'react';
import {HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './gradientGrayButton.module.scss'
const GradientGrayBtn: FC<HasChildrenProps & HasClassName> = ({children, className}) => {
    return (
        <button className={`${className} ${styles.button}`}>{children}</button>
    );
};

export default GradientGrayBtn;