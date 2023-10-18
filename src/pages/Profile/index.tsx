import React, {FC} from 'react';
import Header from "../../components/Header";
import styles from './profile.module.scss'
import LogosSection from "../../components/LogosSection";
import InputWrapper from "../../components/Inputs/InputWrapper";
import {DeleteIcon, EditIcon, PlusIncCircleIcon, SaveIcon} from "../../icons";
import GrayButton from "../../components/Buttons/GrayButton";
import DarkBorderedButton from "../../components/Buttons/DarkBorderedButton";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import List from "../../components/List";
import {handleNewAddress} from "../../features/modals/modalsSlice";
import {removeAddress} from "../../features/profile/profileSlice";
import {handleProfileFormEditing, handleProfileFormVal} from "../../features/forms/formsSlice";


type TextFieldProps = {
    isEditing: boolean,
    formValue: string,
    condValue: string,

} & Pick<InputWrapper, "placeholder" | "labelText" | "changeVal" | "setVal">
const TextField: FC<TextFieldProps> = ({isEditing, condValue, changeVal, setVal, placeholder, labelText, formValue}) => {
    const condIsEmpty = condValue.length === 0
    const formValIsEmpty = formValue.length === 0

    const editingAndFilledCond = isEditing && condValue.length !== 0
    const editingOrEmpty = isEditing || !formValue.length
    const formValueEqualsCond = formValue === condValue

    const canBeSaved = !formValueEqualsCond && !formValIsEmpty

    const dispatch = useAppDispatch()

    const handleBlur = () => {
        dispatch(handleProfileFormEditing("name"))
    }
    const handleSave = () => {
        dispatch(handleProfileFormVal({keyField: "name", val: condValue}))
    }

    return (
        <InputWrapper
            isChanging={isEditing}
            setVal={setVal}
            changeVal={changeVal}
            disabled={!editingAndFilledCond && !canBeSaved}
            inActive={!isEditing && !condIsEmpty && !canBeSaved}
            onInputBlur={() => handleBlur()}
            grayBorderedClassName={styles.inputField}
            inputVal={formValue}
            placeholder={placeholder}
            labelText={labelText}
            btn={
                editingOrEmpty || !formValueEqualsCond ?
                    <div onClick={canBeSaved ? handleSave : () => alert("net")}
                         className={"w-content cur-pointer f-c-col"}>
                        <SaveIcon fill={!canBeSaved ? "#E2E2E9" : "#FB634D"}/>
                    </div> :
                    <div onClick={() => dispatch(handleProfileFormEditing("name"))}
                         className={"w-content cur-pointer f-c-col"}>
                        <EditIcon/>
                    </div>
            }/>
    )
}
const Profile = () => {
    const {data, addresses} = useAppSelector(state => state.profile)
    const {name, dob, email} = useAppSelector(state => state.forms.profileForm)

    const dispatch = useAppDispatch()
    return (
        <>
            <Header/>
            <LogosSection/>
            <div className={styles.profile}>
                <div className="wrapper">
                    <div className="profileBlock f-column gap-40">
                        <div className={`${styles.form} f-column gap-25`}>
                            <div className="sectionTitle">
                                Личные данные
                            </div>
                            <div className="personalForm f-column gap-20">
                                <TextField
                                    placeholder={"Иван"}
                                    labelText={"Ваше имя"}
                                    isEditing={name.isEditing}
                                    formValue={name.val}
                                    condValue={data.name}
                                    setVal={val => dispatch(handleProfileFormVal({keyField: "name", val: val}))}
                                    changeVal={e => dispatch(handleProfileFormVal({keyField: "name", val: e.target.value}))}
                                />

                                <InputWrapper disabled={true} inActive={true} grayBorderedClassName={styles.inputField}
                                              locked={true}
                                              inputVal={"+7 (951) 735-89-45"} placeholder={"Номер телефона"}
                                              labelText={
                                                  "Номер телефона"
                                              }/>
                                <InputWrapper inActive={false} grayBorderedClassName={styles.inputField} btn={
                                    <div className={"w-content f-c-col"}>
                                        <SaveIcon/>
                                    </div>
                                } inputVal={"16-10-1900"} placeholder={"Дата рождения"} labelText={
                                    "Дата рождения"
                                }/>
                                <TextField
                                    isEditing={email.isEditing}
                                    formValue={email.val}
                                    condValue={data.email}
                                    placeholder={"address@mail.ru"}
                                    labelText={"Ваша почта"}
                                />

                            </div>
                        </div>
                        <div className={`${styles.addressesBlock} f-column gap-25`}>
                            <div className="top f-row-betw">
                                <div className="sectionTitle">
                                    Адреса
                                </div>
                                <DarkBorderedButton onClick={() => dispatch(handleNewAddress())}
                                                    className={`${styles.addAddressBtn}`}>
                                    <div className={"d-f al-center gap-5"}>
                                        <PlusIncCircleIcon height={14} width={14}/>
                                        <p>Добавить</p>
                                    </div>
                                </DarkBorderedButton>
                            </div>
                            {
                                addresses.length ?
                                    <List listBlockClassname={"addresses f-column gap-20"} list={addresses}
                                          renderItem={({city, id}) => (
                                              <div className={`${styles.addressItem} f-row-betw`}>
                                                  <div className="left f-column gap-5">
                                                      <p>{city}</p>
                                                      <b>{city}</b>
                                                  </div>
                                                  <div onClick={() => dispatch(removeAddress(id))}
                                                       className="w-content f-c-col">
                                                      <DeleteIcon/>
                                                  </div>

                                              </div>
                                          )}
                                    /> :
                                    <p className={styles.addressesEmptyText}>Добавьте новый адрес чтобы ещё удобнее
                                        совершать покупки</p>
                            }
                        </div>
                        <GrayButton className={`${styles.logoutBtn} w-content cur-pointer`}>Выйти</GrayButton>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Profile;