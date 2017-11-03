import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

class Authorize extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.user) {
            browserHistory.push('/login');
        }
    }

    render() {
        if( this.props.user ) {
            const childrenWithProps = React.Children.map(this.props.children,
                (child) => React.cloneElement(child, {
                    user: this.props.user,
                    logout: this.props.logout,
                    login: this.props.login
                })
            );
            return(
                <div>
                    {childrenWithProps}
                </div>
            )
        } else {
            return null;
        }
    }

}

export default Authorize;
