import React, {FC} from 'react';
import {HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './redButton.module.scss'
const RedButton: FC<HasChildrenProps & HasClassName> = ({children, className}) => {
    return (
        <button className={`${className} f-c-col ${styles.button}`}>{children}</button>
    );
};

export default RedButton;