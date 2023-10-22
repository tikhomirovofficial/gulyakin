import React, {FC, useEffect, useRef} from 'react';
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
import {editUser, removeAddress} from "../../features/profile/profileSlice";
import {handleOrderFormEditing, handleProfileFormEditing, handleProfileFormVal} from "../../features/forms/formsSlice";
import {HasClassName} from "../../types/components.types";
import {TextField} from "../../components/Inputs/TextField";



const Profile = () => {
    const {data, addresses} = useAppSelector(state => state.profile)
    const {name, dob, email} = useAppSelector(state => state.forms.profileForm)
    const dispatch = useAppDispatch()

    const handleUserEdit = () => {
        dispatch(editUser({
            name: name.val,
            email: email.val,
            dob: dob.val
        }))
    }

    return (
        <>
            <Header/>
            <div className={styles.profile}>
                <div className="wrapper">
                    <div className="profileBlock f-column gap-40">
                        <div className={`${styles.form} f-column gap-25`}>
                            <div className="sectionTitle">
                                Личные данные
                            </div>
                            <div className="personalForm f-column gap-20">
                                <TextField
                                    handleSave={handleUserEdit}
                                    className={styles.inputField}
                                    placeholder={"Иван"}
                                    labelText={"Ваше имя"}
                                    isEditing={name.isEditing}
                                    formValue={name.val}
                                    condValue={data.name}
                                    handleEdit={() => {
                                        dispatch(handleProfileFormEditing("name"))
                                    }}
                                    onInputFocus={() => {
                                        dispatch(handleProfileFormEditing("name"))
                                    }}
                                    onInputBlur={() => {
                                        dispatch(handleProfileFormEditing("name"))
                                        dispatch(handleProfileFormVal({keyField: "name", val: data.name}))
                                    }}
                                    setVal={val => dispatch(handleProfileFormVal({keyField: "name", val: val}))}
                                    changeVal={e => dispatch(handleProfileFormVal({keyField: "name", val: e.target.value}))}
                                />

                                <InputWrapper disabled={true} inActive={true} grayBorderedClassName={styles.inputField}
                                              locked={true}
                                              inputVal={data.phone} placeholder={"Номер телефона"}
                                              labelText={
                                                  "Номер телефона"
                                              }/>
                                <TextField
                                    handleSave={handleUserEdit}
                                    className={styles.inputField}
                                    placeholder={"Дата"}
                                    labelText={"Дата рождения"}
                                    isEditing={dob.isEditing}
                                    formValue={dob.val}
                                    condValue={data.dob}
                                    handleEdit={() => {
                                        dispatch(handleProfileFormEditing("dob"))
                                    }}
                                    onInputFocus={() => {
                                        dispatch(handleProfileFormEditing("dob"))
                                    }}
                                    onInputBlur={() => {
                                        dispatch(handleProfileFormEditing("dob"))
                                        dispatch(handleProfileFormVal({keyField: "dob", val: data.dob}))
                                    }}
                                    setVal={val => dispatch(handleProfileFormVal({keyField: "dob", val: val}))}
                                    changeVal={e => dispatch(handleProfileFormVal({keyField: "dob", val: e.target.value}))}
                                />
                                <TextField
                                    handleSave={handleUserEdit}
                                    className={styles.inputField}
                                    placeholder={"address@mail.ru"}
                                    labelText={"Ваша почта"}
                                    isEditing={email.isEditing}
                                    formValue={email.val}
                                    condValue={data.email}
                                    handleEdit={() => {
                                        dispatch(handleProfileFormEditing("email"))
                                    }}
                                    onInputFocus={() => {
                                        dispatch(handleProfileFormEditing("email"))
                                    }}
                                    onInputBlur={() => {
                                        dispatch(handleProfileFormEditing("email"))
                                        dispatch(handleProfileFormVal({keyField: "email", val: data.email}))
                                    }}
                                    setVal={val => dispatch(handleProfileFormVal({keyField: "email", val: val}))}
                                    changeVal={e => dispatch(handleProfileFormVal({keyField: "email", val: e.target.value}))}
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