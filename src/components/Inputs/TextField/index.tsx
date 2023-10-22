import InputWrapper from "../InputWrapper";
import {HasClassName} from "../../../types/components.types";
import React, {FC, useRef} from "react";
import {useAppDispatch} from "../../../app/hooks";
import {handleProfileFormEditing} from "../../../features/forms/formsSlice";
import {EditIcon, SaveIcon} from "../../../icons";

type TextFieldProps = {
    isEditing: boolean,
    formValue: string,
    condValue: string,
    handleSave: () => void,
    handleEdit?: () => void,

} & Pick<InputWrapper, "placeholder" | "labelText" | "changeVal" | "setVal" | "onInputBlur" | "onInputFocus" | "isTextArea" | "textChangeVal"> & HasClassName
export const TextField: FC<TextFieldProps> = ({isEditing, textChangeVal, handleEdit, onInputBlur, isTextArea, onInputFocus, className, handleSave, condValue, changeVal, setVal,
  placeholder, labelText, formValue}) => {


    const editRef = useRef<HTMLDivElement>(null)

    const condIsEmpty = condValue?.length === 0
    const formValIsEmpty = formValue?.length === 0
    const editingAndFilledCond = isEditing && condValue?.length !== 0
    const editingOrEmpty = isEditing || !formValue?.length
    const formValueEqualsCond = formValue === condValue
    const bothEmpty = condValue === "" && formValueEqualsCond

    const canBeSaved = !formValueEqualsCond && !formValIsEmpty

    const dispatch = useAppDispatch()

    const handleInputFocus = () => {
        if(editRef.current !== null) {
            const inputElement = editRef.current?.parentNode?.children[0] as HTMLInputElement
            inputElement.focus()
        }
    }
    const handleEditing = () => {
        if(handleEdit) {
            handleEdit()
        }

        handleInputFocus()
    }


    return (
        <InputWrapper
            isChanging={isEditing}
            setVal={setVal}
            changeVal={changeVal}
            textChangeVal={textChangeVal}
            disabled={!isEditing && !condIsEmpty && !canBeSaved}
            inActive={!isEditing && !condIsEmpty && !canBeSaved}
            onInputBlur={formValueEqualsCond || (!formValueEqualsCond && formValIsEmpty)?  onInputBlur : undefined}
            grayBorderedClassName={className}
            onInputFocus={onInputFocus}
            inputVal={formValue}
            isTextArea={isTextArea}
            placeholder={placeholder}
            labelText={labelText}
            btn={
                editingOrEmpty || !formValueEqualsCond ?
                    <div onClick={canBeSaved ? handleSave : () => console.log("Nothing edited")}
                         className={`w-content cur-pointer ${!isTextArea ? "f-c-col" : ""}`}>
                        <SaveIcon fill={!canBeSaved ? "#E2E2E9" : "#FB634D"}/>
                    </div> :
                    <div ref={editRef} onClick={handleEditing}
                         className={`w-content cur-pointer  ${!isTextArea ? "f-c-col" : ""}`}>
                        <EditIcon/>
                    </div>
            }/>
    )
}