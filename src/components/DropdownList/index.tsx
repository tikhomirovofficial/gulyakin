import React, {FC, RefObject} from 'react';
import List from "../List";
import {HasClassName} from "../../types/components.types";
import styles from "./dropdown.module.scss"
import {CheckedMark} from "../../icons";

interface DropDownItemProps  {
    isCurrent: boolean,
    text: string,
    selectHandler: () => void
}
export const DropDownItem: FC<DropDownItemProps & HasClassName> = ({isCurrent, className, text, selectHandler}) => {
    return (
        <div onClick={selectHandler} className={`${className} ${styles.item} ${isCurrent ? styles.checkedItem : ""}`}>
            <p>
                {text}
            </p>
            {isCurrent ? <CheckedMark height={11} width={11}/> : null}
        </div>
    )
}
interface DropdownListProps{
    items: Array<string>,
    current: number,
    classNameItem?: string,
    selectHandler: (current: number) => void
}
const DropdownList: FC<DropdownListProps & HasClassName> = ({items, current,selectHandler, className, classNameItem}) => {
    return (
        <List listBlockClassname={className}  list={items} renderItem={(item, index) => <DropDownItem selectHandler={() => selectHandler(index)} className={classNameItem || ""} text={item} isCurrent={current === index}/>}/>
    );
};

export default DropdownList;