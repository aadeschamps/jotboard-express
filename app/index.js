import { render } from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './components/app';
import SignupForm from './components/signup/signupForm';
import LoginForm from './components/login/loginForm';
import Homepage from './components/homepage/homepage';
import Boards from './components/boards/index';
import Authorize from './components/shared/authorize';

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Homepage} />
            <Route path='signup' component={SignupForm}/>
            <Route path='login' component={LoginForm}/>
            <Route component={Authorize}>
                <Route path='boards' component={Boards}/>
            </Route>
        </Route>
    </Router>
    ),
    document.getElementById('app')
);
