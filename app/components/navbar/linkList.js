import React from 'react';
import NavLink from './navLink';
import axios from 'axios';

export default ({ children }) => {
    return (    
        <ul className='right hide-on-small-and-down'>
            {children}
        </ul>
    );
}
