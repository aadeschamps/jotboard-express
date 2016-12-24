import { render } from 'react-dom';
import React from 'react';
import SignupForm from './signup/signupForm';
import Navbar from './navbar/navbar';
import { Link, browserHistory } from 'react-router';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
        this.login = this.login.bind(this);
        this.logOff = this.logOff.bind(this);
    }

    login() {
        this.setState({ loggedIn: true })
        browserHistory.push('/');
    }

    logOff() {
        this.setState({ loggedIn: false })
        browserHistory.push('/login');
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                loggedIn: this.state.loggedIn,
                logOff: this.logOff,
                login: this.login
            })
        );

        return(
            <div className='container-fluid'>
                <div className='col-md-12 navbar-default container-fluid'>
                    <Navbar 
                        loggedIn={this.state.loggedIn}
                        logOff={this.logOff}
                    />
                </div>
                <div className='col-md-6 col-md-offset-3'>
                    {childrenWithProps}
                </div>
            </div>
        );
    }
};

export default App;
