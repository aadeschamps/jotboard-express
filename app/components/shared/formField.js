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
            <div className='row'>
            <div className='input-field'>
                <input
                    id={this.props.name}
                    className='validate'
                    type={this.props.type}
                    name={this.props.name}
                    onChange={this.props.onChange}
                    value={this.props.value}
                />
                <label htmlFor={this.props.name} data-error={this.props.error}> {this.props.label} </label>
                {this.renderError()}
            </div>
            </div>
        )
    }
};

export default FormField;
