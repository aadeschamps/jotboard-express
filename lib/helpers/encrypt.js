'use strict';
var Promise = require('bluebird');
var bcrypt = require('bcrypt');
const saltRounds = 10;

const genSalt = function() {
    return new Promise((resolve, reject) => {
        return bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) {
                return reject(err);
            }
            return resolve(salt);
        })
    });
};

const hash = function(plainText, salt) {
    return new Promise((resolve, reject) => {
        return bcrypt.hash(plainText, salt, (err, hash) => {
            if(err) {
                return reject(err);
            }
            return resolve(hash);
        })
    });
}

const encrypt = {
    hash: function(password) {
        return genSalt()
            .then((salt) => {
                return hash(password, salt);
            });
    },

    compare: function(password, passwordDigest) {

    }
};

module.exports = encrypt;
