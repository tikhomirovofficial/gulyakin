import React, {FC} from 'react';
import {HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './shadowWrapper.module.scss';

interface ShadowWrapperProps {
    onClick?: () => void
}
const ShadowWrapper: FC<HasChildrenProps & ShadowWrapperProps & HasClassName> = ({children, className, onClick}) => {
    return (
        <div onClick={onClick} className={`${className ? className : `f-c-col`} ${styles.shadowContainer}  h-100v w-100v p-fix top-0 left-0`}>
            {children}
        </div>
    );
};

export default ShadowWrapper;