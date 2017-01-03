import React from 'react';
import LinkList from './linkList';
import Logo from './logo';

class Navbar extends React.Component {
    render() {
        return (
            <nav className='row'>
                <div className='nav-wrapper blue-grey darken-3'>
                    <Logo />
                    <LinkList
                        user={this.props.user}
                        logout={this.props.logOff}
                    />
                </div>
            </nav>
        )
    }
}

export default Navbar;
