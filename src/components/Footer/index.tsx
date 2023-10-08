import React from 'react';
import styles from "../../pages/Main/main.module.scss";
import {CreatedLogo, Logo, VkIcon} from "../../icons";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className={`${styles.footer} pd-40-0`}>
            <div className="wrapper">
                <div className="block gap-40 f-column">
                    <nav className={"d-f jc-between"}>
                        <div className={`${styles.navColumn} f-column gap-10`}>
                            <Logo className={styles.logo}/>
                            <Link className={styles.navItem} to={"/"}>О нас</Link>
                        </div>
                        <div className={`${styles.navColumn} f-column gap-10`}>
                            <b className={styles.navItem}>Работа</b>
                            <Link className={styles.navItem} to={"/"}>В Гулякин <br/> Фудхолл</Link>
                            <Link className={styles.navItem} to={"/"}>В Гуленьки <br/> Пельменная</Link>
                            <Link className={styles.navItem} to={"/"}>В iFood</Link>
                            <Link className={styles.navItem} to={"/"}>В Воробушек</Link>
                            <Link className={styles.navItem} to={"/"}>В Gusto</Link>
                            <Link className={styles.navItem} to={"/"}>В Креветочная</Link>
                            <Link className={styles.navItem} to={"/"}>В Гулибули</Link>
                        </div>
                        <div className={`${styles.navColumn} f-column gap-10`}>
                            <b className={styles.navItem}>Партнёрам</b>
                            <Link className={styles.navItem} to={"/"}>Инвестиции</Link>
                            <Link className={styles.navItem} to={"/"}>Поставщикам</Link>
                            <Link className={styles.navItem} to={"/"}>Предложить помещение</Link>
                        </div>
                        <div className={`${styles.navColumn} f-column gap-10`}>
                            <b className={styles.navItem}>Документы</b>
                            <Link className={styles.navItem} to={"/"}>Политика конфиденциальности</Link>
                            <Link className={styles.navItem} to={"/"}>Пользовательское соглашение</Link>
                            <Link className={styles.navItem} to={"/"}>Соглашение на обработку ПД</Link>
                            <Link className={styles.navItem} to={"/"}>Правила программы лояльности</Link>
                        </div>
                        <div className={`${styles.navColumn} f-column gap-10`}>
                            <b className={styles.navItem}>Контакты</b>
                            <a className={styles.navItem} href="">mail@mail.ru</a>
                            <a className={styles.navItem} href="">+7 (495) 345-64-54</a>
                            <div className={`${styles.socials} d-f gap-10`}>
                                <a href="" className={`${styles.item} f-c-col`}>
                                    <VkIcon/>
                                </a>
                                <a href="" className={`${styles.item} f-c-col`}>
                                    <VkIcon/>
                                </a>
                                <a href="" className={`${styles.item} f-c-col`}>
                                    <VkIcon/>
                                </a>
                            </div>
                        </div>
                    </nav>
                    <div className="f-row-betw">
                        <div className={styles.copyright}>
                            <p>© 2023 ООО «Гулякин»</p>
                            <p>ОГРН 1234567899116, ИНН 3589065840</p>
                            <p> 162606, Ханты-Мансийский автономный округ, г. Сургут, ул. Энергетиков, д. 4</p>
                        </div>
                        <div className={styles.created}>
                            <p>Создание сайта</p>
                            <CreatedLogo/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;