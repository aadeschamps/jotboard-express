const encrypt = require('../helpers/encrypt');

module.exports = function token(req, res, next) {
    const token = req.cookies['x-authorization'];
    
    if ( token ) {
        encrypt.verifyToken(token)
            .then((user) => req.user = user)
            .catch((err) => req.user = null)
            .finally(() => next());
    } else {
        req.user = null
        return next();
    }
};