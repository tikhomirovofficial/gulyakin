import React, {FC, useEffect} from 'react';
import {Link} from "react-router-dom";
import {ArrowMiniRightIcon, CartIcon, Logo, ProfileIcon} from "../../icons";
import styles from './main.module.scss'
const Main: FC = () => {

    return (
        <>
            <header className={styles.header}>
                <div className="wrapper">
                    <div className="block pd-30-0 f-row-betw gap-50">
                        <div className="left d-f al-center gap-35">
                            <Link to={"/"} className="">
                                <Logo/>
                            </Link>
                            <div className={`${styles.logoText}  f-column gap-5`}>
                                <p>Доставка готовый еды</p>
                                <div className={`d-f al-center gap-10`}>
                                    <p>в городе</p>
                                    <div className={`${styles.city} d-f al-center gap-5`}>
                                        <b>Сургут</b>
                                        <ArrowMiniRightIcon/>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <nav className={"d-f gap-20"}>
                            <Link className={styles.item} to={"/"}>О нас</Link>
                            <Link className={styles.item} to={"/"}>Каталог</Link>
                            <Link className={styles.item} to={"/"}>Контакты</Link>
                            <Link className={styles.item} to={"/"}>Вакансии</Link>
                            <Link className={styles.item} to={"/"}>Инвестиции</Link>
                            <Link className={styles.item} to={"/"}>Предложить помещение</Link>
                            <Link className={styles.item} to={"/"}>Поставщикам</Link>
                            <Link className={styles.item} to={"/"}>Помощь</Link>
                        </nav>
                        <div className={`${styles.right} d-f al-center gap-20`}>
                            <div className={`${styles.profileBtn} btn d-f al-center gap-5 cur-pointer`}>
                                <ProfileIcon height={22} width={16}/>
                                <b>
                                    Кабинет
                                </b>
                            </div>
                            <div className={`${styles.cartBtnFilled} ${styles.cartBtn} btn d-f gap-5 al-center cur-pointer`}>
                                <CartIcon  height={22} width={22}/>
                                <b>
                                    4300 ₽
                                </b>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>

    );
};

export default Main;