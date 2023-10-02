import React from 'react';
import styles from "./logosSection.module.scss";
import {
    FoodHallLogo,
    FoodPancakesLogo,
    GulenkiPelmeniLogo, GulibuliLogo,
    GustoLogo,
    IFoodLogo,
    ShrimpLogo,
    VorobushekLogo
} from "../../icons";

const logosIsMax = false
const LogosSection = () => {
    return (
        <div className={`pd-40-0`}>
            <div className="wrapper">
                <div className="block f-column gap-30">
                    <div className={`${styles.logos} ${logosIsMax ? "jc-between" : "jc-around"}  d-f gap-20`}>

                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <FoodHallLogo/>
                        </div>
                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <GulenkiPelmeniLogo/>
                        </div>
                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <FoodPancakesLogo/>
                        </div>
                        <div className={`${styles.item} ${styles.neededFill} ${styles.neededIfood} f-c-col `}>
                            <IFoodLogo/>
                        </div>
                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <VorobushekLogo/>
                        </div>
                        <div className={`${styles.item} ${styles.neededGusto} f-c-col `}>
                            <GustoLogo/>
                        </div>
                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <ShrimpLogo/>
                        </div>
                        <div className={`${styles.item} ${styles.neededFill} f-c-col `}>
                            <GulibuliLogo/>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default LogosSection;