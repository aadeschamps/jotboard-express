import React from 'react';
import NavLink from './navLink';

class NavbarLinkList extends React.Component {

    render() {
        return (
            <ul className='nav navbar-nav'>
                <li>
                    <NavLink
                        to='/about'
                        text='About'
                    />
                </li>
                <li>
                    <NavLink
                        to='/login'
                        text='Login'
                    />
                </li>
                <li>
                    <NavLink
                        to='/signup'
                        text='Signup'
                    />
                </li>
            </ul>
        );
    }

};

export default NavbarLinkList;
