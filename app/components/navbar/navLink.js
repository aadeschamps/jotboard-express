import React from 'react';
import { Link } from 'react-router';

const noop = () => {};

class NavLink extends React.Component {

    render() {
        return (
            <Link 
                className={this.props.className}
                to={this.props.to}
                onClick={this.props.onClick || noop}
            > 
                {this.props.text}
            </Link>
        );
    }

};

export default NavLink;
