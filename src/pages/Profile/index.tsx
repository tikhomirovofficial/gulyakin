import React from 'react';
import Header from "../../components/Header";
import styles from './profile.module.scss'
import LogosSection from "../../components/LogosSection";

const Profile = () => {
    return (
        <>
            <Header/>
            <LogosSection/>
            <div className={styles.profile}>
                <div className="wrapper">
                    <div className="profileBlock f-column gap-40">
                        <div className="personalData">
                            <div className="sectionTitle">
                                Личные данные
                            </div>
                            <div className="personalForm f-column gap-20">

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Profile;