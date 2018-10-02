const _ = require('lodash');

const {User} = require('../models/user');

/* POST /users */
exports.postUser = (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
};

/* GET /users/me */
exports.getUser = (req, res) => {
    res.send(req.user);
};