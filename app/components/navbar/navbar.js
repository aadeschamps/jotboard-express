import React from 'react';
import axios from 'axios';
import LinkList from './linkList';
import NavLink from './navLink';
import Logo from './logo';

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.signedIn = this.signedIn.bind(this);
        this.signedOut = this.signedOut.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        axios.delete('/api/sessions', this.state)
            .then((res) => {
                this.props.logout();
            });
    }

    signedIn() {
        return (
            [
                <li>
                    <NavLink
                        to='#'
                        text='Logout'
                        onClick={this.logout}
                    />
                </li>
            ]
        );
    }

    signedOut() {
        return (
            [
                <li>
                    <NavLink
                        to='/login'
                        text='Login'
                    />
                </li>,
                <li>
                    <NavLink
                        to='/signup'
                        text='Signup'
                    />
                </li>
            ]
        )
    }    

    render() {
        return (
            <nav className='row'>
                <div className='nav-wrapper blue-grey darken-3'>
                    <Logo user={ this.props.user } />
                    <LinkList>
                        { this.props.user ? this.signedIn() : this.signedOut() }
                    </LinkList>
                </div>
            </nav>
        )
    }
}

export default Navbar;
