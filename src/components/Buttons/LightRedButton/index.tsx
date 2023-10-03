import React, {FC} from 'react';
import {ButtonProps, HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './lightRedButton.module.scss'

const LightRedButton: FC<HasChildrenProps & HasClassName & ButtonProps> = ({children, onClick, className, disabled= false}) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`${className} f-c-col ${styles.button}`}>{children}</button>
    );
};

export default LightRedButton;