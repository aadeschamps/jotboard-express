import { render } from 'react-dom';
import React from 'react';
import SignupForm from './signup/signupForm';
import Navbar from './navbar/navbar';
import { Link } from 'react-router';

class App extends React.Component {
    render() {
        return(
            <div className='container-fluid'>
                <div className='col-md-12 navbar-default container-fluid'>
                    <Navbar />
                </div>
                <div className='col-md-6 col-md-offset-3'>
                    { this.props.children }
                </div>
            </div>
        );
    }
};

export default App;
