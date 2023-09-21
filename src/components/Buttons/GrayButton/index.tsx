import React, {FC} from 'react';
import {HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './grayButton.module.scss'
const GrayButton: FC<HasChildrenProps & HasClassName> = ({children, className}) => {
    return (
        <button className={`${className} f-c-col ${styles.button}`}>{children}</button>
    );
};

export default GrayButton;