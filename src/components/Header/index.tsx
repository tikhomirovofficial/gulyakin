import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div style={{paddingBottom: "20px", display: "flex", gap: 30}}>
            Шапка
            <nav style={{display: "flex", gap: 30}}>
                <Link to={"/"}>Общая</Link>
                <Link to={"/login"}>Страница логина</Link>
                <Link to={"/profile"}>Профиль</Link>
            </nav>
        </div>
    );
};

export default Header;