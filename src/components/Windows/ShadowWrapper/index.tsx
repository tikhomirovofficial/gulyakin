import React, {FC} from 'react';
import {HasChildrenProps} from "../../../types/components.types";
import styles from './shadowWrapper.module.scss';
const ShadowWrapper: FC<HasChildrenProps> = ({children}) => {
    return (
        <div className={`${styles.shadowContainer} h-100v w-100v p-fix top-0 left-0 f-c-col`}>
            {children}
        </div>
    );
};

export default ShadowWrapper;