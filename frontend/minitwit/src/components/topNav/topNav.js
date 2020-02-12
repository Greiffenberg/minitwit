import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../style.css';

export default function(){
    return(
        <div>
            <NavLink className="nav-element" to="/timeline">timeline</NavLink>
            <NavLink className="nav-element" to="/login">login</NavLink>
            <NavLink className="nav-element" to="/register">register</NavLink>
        </div>
    );
}