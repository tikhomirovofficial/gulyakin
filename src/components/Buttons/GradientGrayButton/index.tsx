import React, {FC} from 'react';
import {ButtonProps, HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './gradientGrayButton.module.scss'
const GradientGrayBtn: FC<HasChildrenProps & HasClassName & ButtonProps> = ({children, className, onClick}) => {
    return (
        <button onClick={onClick} className={`${className} ${styles.button}`}>{children}</button>
    );
};

export default GradientGrayBtn;