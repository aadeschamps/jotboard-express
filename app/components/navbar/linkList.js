import React from 'react';
import NavLink from './navLink';
import axios from 'axios';

class linkList extends React.Component {

    constructor(props) {
        super(props);

        this.signedIn = this.signedIn.bind(this);
        this.signedOut = this.signedOut.bind(this);
        this.logout = this.logout.bind(this);
    }

    // DEFINITELY HAVE TO MOVE THIS UP THE CHAIN, JUST TO PROVE IT WORKS FOR NOW
    logout(e) {
        e.preventDefault();
        axios.delete('/api/sessions', this.state)
            .then((res) => {
                this.props.logout();
            });
    }

    signedIn() {
        return (
            <li>
                <NavLink
                    to='#'
                    text='Logout'
                    onClick={this.logout}
                />
            </li>
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
            <ul className='right hide-on-small-and-down'>
                { this.props.user ? this.signedIn() : this.signedOut() }
            </ul>
        );
    }

};

export default linkList;
