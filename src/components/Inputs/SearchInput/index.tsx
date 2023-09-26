import styles from "./searchInput.module.scss";
import {CloseIcon, SearchIcon} from "../../../icons";
import GrayBorderedBlock from "../../GrayBorderedBlock";
import React, {FC, useState} from "react";
import {useInput} from "../../../hooks/useInput";
import {HasClassName} from "../../../types/components.types";


const SearchInput: FC<HasClassName> = ({className}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [inputVal, changeVal, setVal] = useInput("")

    const handleClearInput = () => setVal("")

    return (
        <GrayBorderedBlock className={`${styles.search} ${className || null} ${isFocused ? styles.searchFocused : null} f-row-betw gap-20`}>
            <SearchIcon/>
            <input onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)} value={inputVal} onChange={changeVal} className={"f-1"} type="text" placeholder={"Поиск по меню"}/>
            {
                inputVal.length ?
                    <div onClick={handleClearInput} className={`${styles.close} cur-pointer visible f-c-col`}>
                        <CloseIcon/>
                    </div> : null
            }
        </GrayBorderedBlock>
    );
};

export default SearchInput;
