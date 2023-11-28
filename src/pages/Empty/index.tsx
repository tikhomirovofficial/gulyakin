import React from 'react';
import { Link } from 'react-router-dom';
import RedButton from "../../components/Buttons/RedButton";
import styles from './empty.module.scss'
const Empty = () => {
    return (
        <div className={"pageTop"}>
            <div className="wrapper">
                <div className={`${styles.emptyBlock} w-100p h-100p f-c-col`}>
                    <div className="f-column al-center gap-20">
                        <div className={"bigSectionTitle txt-center grayColor_dark"}>Страница пуста</div>
                        <p className={`txt-center ${styles.description}`}>К сожалению, информация на данной странице ещё не заполнена, зайдите, пожалуйста,  позже</p>
                        <Link to={"/"} className={"w-content h-content"}>
                            <RedButton className={styles.button}>Вернуться в каталог</RedButton>
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Empty;