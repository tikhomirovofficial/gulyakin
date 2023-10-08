import React, {FC} from 'react';
import {ButtonProps, HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './darkBorderedBtn.module.scss'

const DarkBorderedButton: FC<HasChildrenProps & HasClassName & ButtonProps> = ({children, onClick, className, disabled= false}) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`${className} f-c-col ${styles.button}`}>{children}</button>
    );
};

export default DarkBorderedButton;