import React from 'react';

class FormField extends React.Component {

    initialize(opt) {
        this.renderError = this.renderError.bind(this)
    }

    renderError() {
        if(this.props.error) {
            return (
                <div className='alert alert-danger'>
                    {this.props.error}
                </div>
            )
        }
    }

    render() {
        return (
            <div className='form'>
                <label> {this.props.label} </label>
                <input 
                    className='form-control'
                    type={this.props.type}
                    name={this.props.name}
                    onChange={this.props.onChange}
                    value={this.props.value}
                />
                { this.renderError() }
            </div>
        )
    }
};

export default FormField;
