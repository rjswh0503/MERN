import React from "react";
import { NavLink } from "react-router-dom";


import './NavLinks.css';



const NavLinks = props => {

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>모든 유저</NavLink>
        </li>
        <li>
            <NavLink to="/u1/places">나의 장소</NavLink>
        </li>
        <li>
            <NavLink to="/places/new">장소 추가</NavLink>
        </li>
        <li>
            <NavLink to="/auth">인증기능</NavLink>
        </li>
    </ul>
}


export default NavLinks;