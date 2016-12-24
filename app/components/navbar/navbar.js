import React from 'react';
import NavbarLinkList from './navbarLinkList';
import Logo from './logo';

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <div className='navbar-left nav navbar-nav'>
                    <Logo />
                </div>
                <div className='navbar-right'>
                    <NavbarLinkList
                        loggedIn={this.props.loggedIn}
                        logout={this.props.logOff}
                    />
                </div>
            </div>
        )
    }
}

export default Navbar;
