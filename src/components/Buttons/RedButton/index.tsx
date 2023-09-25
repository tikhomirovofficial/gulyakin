import React, {FC} from 'react';
import {ButtonProps, HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './redButton.module.scss'

const RedButton: FC<HasChildrenProps & HasClassName & ButtonProps> = ({children, onClick, className}) => {
    return (
        <button onClick={onClick} className={`${className} f-c-col ${styles.button}`}>{children}</button>
    );
};

export default RedButton;