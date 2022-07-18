import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className='navbar'>
            <Link className='link' to="workman">Соискателям</Link>
            <Link className='link' to="employer">Работодателям</Link>
        </div>
    );
}

export default Navbar;
