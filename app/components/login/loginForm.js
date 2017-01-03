import React from 'react';
import FormField from '../shared/formField';
import axios from 'axios'

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        let newState = {};
        newState[e.target.name] = e.target.value
        this.setState(newState);
    }

    onSubmit(e) {
        e.preventDefault();
        axios.post('/api/sessions', this.state)
            .then((res) => {
                this.setState({
                    email: '',
                    password: '',
                    errors: {}
                });
                this.props.login(res.data);
            })
            .catch((err) => {
                var error = {};
                error[err.response.data.error.field] = err.response.data.error.message;
                this.setState({ errors: error })
            });
    }

    render() {
        return (
            <div className='row'>
                <form className='col s6 offset-s3'>
                    <FormField
                        label='Email'
                        name='email'
                        type='text'
                        onChange={this.onChange}
                        value={this.state.email}
                        error={this.state.errors.email}
                    />
                    <FormField
                        label='Password'
                        name='password'
                        type='text'
                        onChange={this.onChange}
                        value={this.state.password}
                        error={this.state.errors.password}
                    />
                    <button className='btn waves-effect waves-light blue-grey darken-3' onClick={this.onSubmit} > Login </button>                
                </form>
            </div>
        )
    }
}

export default LoginForm;
