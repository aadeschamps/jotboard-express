import React from 'react';
import NavLink from './navLink';
import axios from 'axios';

class NavbarLinkList extends React.Component {

    constructor(props) {
        super(props);

        this.chooseLink = this.chooseLink.bind(this);
        this.signupLink = this.signupLink.bind(this);
        this.logout = this.logout.bind(this);
    }

    // DEFINITELY HAVE TO MOVE THIS UP THE CHAIN, JUST TO PROVE IT WORKS FOR NOW
    logout(e) {
        e.preventDefault();
        axios.delete('/api/sessions', this.state)
            .then((res) => {
                console.log('logging out');
                this.props.logout();
            });
    }

    chooseLink() {
        if(this.props.loggedIn) {
            return (
                <li>
                    <NavLink
                        to='#'
                        text='Logout'
                        onClick={this.logout}
                    />
                </li>
            );
        } else {
            return (
                <li>
                    <NavLink
                        to='/login'
                        text='Login'
                    />
                </li>
            );
        }
    }

    signupLink() {
        if (!this.props.loggedIn) {
            return (
                <li>
                    <NavLink
                        to='/signup'
                        text='Signup'
                    />
                </li>
            )
        }
    }

    render() {
        return (
            <ul className='nav navbar-nav'>
                <li>
                    <NavLink
                        to='/about'
                        text='About'
                    />
                </li>
                {this.signupLink()}
                {this.chooseLink()}        
            </ul>
        );
    }

};

export default NavbarLinkList;
