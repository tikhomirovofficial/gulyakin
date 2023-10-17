import React from 'react';
import Header from "../../components/Header";
import styles from './profile.module.scss'
import LogosSection from "../../components/LogosSection";
import InputWrapper from "../../components/Inputs/InputWrapper";
import {DeleteIcon, EditIcon, LockedIcon, PlusIncCircleIcon, SaveIcon} from "../../icons";
import GrayButton from "../../components/Buttons/GrayButton";
import DarkBorderedButton from "../../components/Buttons/DarkBorderedButton";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import List from "../../components/List";
import {handleNewAddress} from "../../features/modals/modalsSlice";
import {removeAddress} from "../../features/profile/profileSlice";
import {handleProfileFormEditing, handleProfileFormVal} from "../../features/forms/formsSlice";

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
                                <InputWrapper isChanging={name.isEditing} setVal={val => dispatch(handleProfileFormVal({keyField: "name", val: val}))} changeVal={e => dispatch(handleProfileFormVal({keyField: "name", val: e.target.value}))} disabled={!name.isEditing} inActive={!name.isEditing}
                                              grayBorderedClassName={styles.inputField} btn={
                                    name.isEditing ?
                                        <div  onClick={name.val === data.name ? () => alert("da") : () => alert("net")} className={"w-content cur-pointer f-c-col"}>
                                            <SaveIcon fill={name.val === data.name ? "#E2E2E9" : "#FB634D"}/>
                                        </div> :
                                        <div onClick={() => dispatch(handleProfileFormEditing("name"))} className={"w-content cur-pointer f-c-col"}>
                                            <EditIcon/>
                                        </div>
                                } inputVal={name.val} placeholder={"Ваше имя"} labelText={
                                    "Ваше имя"
                                }/>
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
                                <InputWrapper inActive={false} grayBorderedClassName={styles.inputField} btn={
                                    <div className={"w-content f-c-col"}>
                                        <SaveIcon/>
                                    </div>
                                } inputVal={"pochta@mail.ru"} placeholder={"Электронная почта"} labelText={
                                    "Электронная почта"
                                }/>

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