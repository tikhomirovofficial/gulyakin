import React, {FC, ReactNode} from 'react';
import {HasClassName} from "../../../types/components.types";
import styles from './radio.module.scss'

type RadioInputProps = {
    selected?: boolean,
    onSelect: () => void
    text: string | ReactNode
}
const RadioInput: FC<HasClassName & RadioInputProps> = ({className, onSelect, selected, text}) => {
    return (
        <div onClick={onSelect} className={`${className ? className: ""} ${selected ? styles.radioSelected : null} ${styles.radio} d-f al-center`}>
            <div className={`${styles.marker} f-c-col`}>
                {
                    selected ?
                    <div className={styles.selectedCircle}></div> : null
                }

            </div>
            <div className={styles.text}>
                {text}
            </div>
        </div>
    );
};

export default RadioInput;