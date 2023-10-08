import React from 'react';
import Header from "../../components/Header";
import styles from './profile.module.scss'
import LogosSection from "../../components/LogosSection";
import InputWrapper from "../../components/Inputs/InputWrapper";
import {DeleteIcon, PlusIncCircleIcon, SaveIcon} from "../../icons";
import GrayButton from "../../components/Buttons/GrayButton";
import DarkBorderedButton from "../../components/Buttons/DarkBorderedButton";
import {useAppSelector} from "../../app/hooks";
import List from "../../components/List";

const Profile = () => {
    const {name, email, phone, birthday, addresses} = useAppSelector(state => state.profile.data)
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
                                <InputWrapper inActive={false} grayBorderedClassName={styles.inputField} btn={
                                    <div className={"w-content f-c-col"}>
                                        <SaveIcon/>
                                    </div>
                                } inputVal={"Вячеслав"} placeholder={"Ваше имя"} labelText={
                                    "Ваше имя"
                                }/>
                                <InputWrapper inActive={true} grayBorderedClassName={styles.inputField} btn={
                                    <div className={"w-content f-c-col"}>
                                        <SaveIcon/>
                                    </div>
                                } inputVal={"+7 (951) 735-89-45"} placeholder={"Номер телефона"} labelText={
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
                                <DarkBorderedButton className={`${styles.addAddressBtn}`}>
                                    <div className={"d-f al-center gap-5"}>
                                        <PlusIncCircleIcon height={14} width={14}/>
                                        <p>Добавить</p>
                                    </div>
                                </DarkBorderedButton>
                            </div>
                            {
                                addresses.length ?
                                <List listBlockClassname={"addresses f-column gap-20"} list={addresses}
                                      renderItem={({street, city}) => (
                                          <div className={`${styles.addressItem} f-row-betw`}>
                                              <div className="left f-column gap-5">
                                                  <p>{street}</p>
                                                  <b>{city}</b>
                                              </div>
                                              <DeleteIcon/>
                                          </div>
                                      ) }
                                /> :
                                    <p className={styles.addressesEmptyText}>Добавьте новый адрес чтобы ещё удобнее совершать покупки</p>
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