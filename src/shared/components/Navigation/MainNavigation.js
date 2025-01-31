import React from "react";
import { Link } from 'react-router-dom';

import './MainNavigation.css';
import MainHeader from "./MainHeader";

const MainNavigation = props => {
    return <MainHeader>
        <button className="main-navigation__menu-btn">
            <span />
            <span />
            <span />
        </button>
        <h1 className="main-navigation__title">
        <Link to="/">나의 앱</Link> 
        </h1>
        <nav>
            ...
        </nav>
    </MainHeader>
};

export default MainNavigation;

