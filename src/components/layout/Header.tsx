import React from 'react';
import './Header.scss';
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <nav className="nav">
            <NavLink className="nav-item" to="/" exact>Tracker</NavLink>
            <NavLink className="nav-item" to="/list" exact>List if tracked items</NavLink>
        </nav>
    )
}

export default Header;