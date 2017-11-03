import React from 'react';
import NavLink from './navLink';

export default ({ user }) => {
    let redirectTo = user ? '/boards' : '/'; 
    return (
        <div className='brand-logo'>
            <NavLink
                className='navbar-brand'
                to={redirectTo}
                text='JotBoard'
            />
        </div>
    );
};
