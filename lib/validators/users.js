const validator = require('validator');

const existsAndNotEmpty = function(value) {
    return !value || validator.isEmpty(value);
}

const validate = function(opts) {
    if( existsAndNotEmpty(opts.email)) {
        return { field: 'email', message: 'email is required' };
    }
    if( existsAndNotEmpty(opts.password) ) {
        return { field: 'password', message: 'password is required' };
    }
    if( existsAndNotEmpty(opts.passwordConfirmation) ) {
        return { field: 'passwordConfirmation', message: 'password confirmation is required' };
    }
    if( !validator.equals(opts.password, opts.passwordConfirmation) ) {
        return { field: 'passwordConfirmation', message: 'passwordConfirmation must match password' };
    }
    if( !validator.isEmail(opts.email) ) {
        return { field: 'email', message: 'email is not the correct format' };
    }
    return false;
};

module.exports = validate;
