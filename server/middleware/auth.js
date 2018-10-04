const {User} = require('../models/user');

const isAuthenticated = (req, res, next) => {
    const token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send({
            "errors": {
                "code": 401,
                "message":"Unauthorized. You must be logged in to perform this action"
            }
        });
    });
};

module.exports = {isAuthenticated};