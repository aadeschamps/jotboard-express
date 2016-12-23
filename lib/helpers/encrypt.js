'use strict';
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
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
        return bcrypt.compare(password, passwordDigest)
            .then((results) => {
                if(results) {
                    return results;
                }
                const err = {
                    err: 'password is incorrect',
                    status: 400
                }
                return Promise.reject(err);
            });
    },

    createToken: function(hash) {
        return new Promise((resolve) => {
            const token = jwt.sign(hash, config.auth.secret);
            return resolve(token);
        });
    },
    
    verifyToken: function(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.auth.secret, (err, user) => {
                if (err) {
                    return reject(err);
                }
                return resolve(user);
            });
        })
    }
};

module.exports = encrypt;
