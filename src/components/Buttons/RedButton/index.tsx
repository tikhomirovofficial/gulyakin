import React, {FC} from 'react';
import {ButtonProps, HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './redButton.module.scss'

const RedButton: FC<HasChildrenProps & HasClassName & ButtonProps> = ({children, onClick, className, disabled= false}) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`${className}  f-c-col ${styles.button} ${styles.buttonDark}`}>{children}</button>
    );
};

export default RedButton;