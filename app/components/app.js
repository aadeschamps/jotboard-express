import { render } from 'react-dom';
import React from 'react';
import axios from 'axios';
import { get } from 'lodash';
import SignupForm from './signup/signupForm';
import Navbar from './navbar/navbar';
import { Link, browserHistory } from 'react-router';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loaded: false
        }
        this.login = this.login.bind(this);
        this.logOff = this.logOff.bind(this);
        this.load = this.load.bind(this);
    }

    load() {
        axios.get('/api/sessions')
            .then((res) => {
                let user = res.status === 200 ? res.data : null
                this.setState({ loaded: true, user })
            })
            .catch((err) => {
                // TODO: correctly handle error here
                console.log(err);
            });
    }

    login(user) {
        this.setState({ user })
        browserHistory.push('/');
    }

    logOff() {
        this.setState({ user: null })
        browserHistory.push('/login');
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                user: this.state.user,
                logOff: this.logOff,
                login: this.login
            })
        );

        return (
            <div>
                <Navbar
                    user={this.state.user}
                    logOff={this.logOff}
                />
                <div className='container'>
                    {childrenWithProps}
                </div>
            </div>
        );
    }
};

export default App;
