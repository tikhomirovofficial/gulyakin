import React, {FC} from 'react';
import {HasChildrenProps, HasClassName} from "../../../types/components.types";
import styles from './whiteWrapper.module.scss';
import {CloseIcon} from "../../../icons";
const WindowBody: FC<HasChildrenProps & HasClassName> = ({children, className}) => {
    return (
        <div onClick={e => e.stopPropagation()} className={`${styles.whiteBlock} ${className || null} bg-white p-rel of-hide`}>
            {children}
        </div>
    );
};

export default WindowBody;