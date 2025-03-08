import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import './NavLinks.css';



const NavLinks = props => {
    const auth = useContext(AuthContext);


    return <ul className="nav-links">
        {auth.isLoggedIn
            ?
            <>
                <li>
                    <NavLink to={`/${auth.userId}/places`}>나의 장소</NavLink>
                </li>
                <li>
                    <NavLink to="/places/new">장소 추가</NavLink>
                </li>
                <li>
                    <button onClick={auth.logout}>로그아웃</button>
                </li>
            </>
            :
            <li>
                <NavLink to="/auth">로그인</NavLink>
            </li>
        }
    </ul>
}


export default NavLinks;