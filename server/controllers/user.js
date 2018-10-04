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
        e['code'] = 400;
        res.status(400).send({"errors": e});
    })
};

/* GET /users/me */
exports.getUser = (req, res) => {
    res.send(req.user);
};

/* POST /users/login */
exports.postLogin = (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send({
            "errors": {
                "code": 400,
                "message": "Login failed. Verify your email and password"
            }
        });
    });
};

/* DELETE /users/me/token */
exports.deleteToken = (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
};