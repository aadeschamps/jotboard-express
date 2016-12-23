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
}

module.exports = validate;