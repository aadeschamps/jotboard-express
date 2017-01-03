import React from 'react';
import NavLink from './navLink';

class Logo extends React.Component {

    render() {
        return (
            <div className='brand-logo'>
                <NavLink
                    className='navbar-brand'
                    to='/'
                    text='JotBoard'
                />
            </div>
        );
    }
};

export default Logo;
