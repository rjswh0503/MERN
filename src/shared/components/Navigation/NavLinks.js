import React, { useContext } from "react";
import { NavLink } from "react-router-dom";


import { AuthContext } from "../../context/auth-context";
import './NavLinks.css';



const NavLinks = props => {
    const auth = useContext(AuthContext);

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>모든 유저</NavLink>
        </li>
        {auth.isLoggedIn && (
            <li>
            <NavLink to="/u1/places">나의 장소</NavLink>
        </li>
        )}
        {auth.isLoggedIn && (
        <li>
            <NavLink to="/places/new">장소 추가</NavLink>
        </li>
        )}
        {!auth.isLoggedIn && ( 
        <li>
            <NavLink to="/auth">로그인</NavLink>
        </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <button onClick={auth.logout}>로그아웃</button>
            </li>
        )}
    </ul>
}


export default NavLinks;