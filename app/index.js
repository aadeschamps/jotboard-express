import { render } from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/app';
import SignupForm from './components/signup/signupForm';
import LoginForm from './components/login/loginForm';

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path='signup' component={SignupForm}/>
            <Route path='login' component={LoginForm}/>
        </Route>
    </Router>
    ), 
    document.getElementById('app')
);
