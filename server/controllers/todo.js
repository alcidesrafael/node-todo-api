const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {Todo} = require('../models/todo');

/* POST /todos */
exports.postTodos = (req, res) => {
    const text = req.body.text;
    const user_id = req.user._id;

    const todo = new Todo({
        text: text,
        _creator: user_id
    });

    todo.save().then((todo) => {
        res.send({todo});
    }, (e) => {
        res.status(400).send(e);
    });
};

/* GET /todos */
exports.getTodos = (req, res) => {
    const user_id = req.user._id;

    Todo.find({
        _creator: user_id
    }).then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
};

/* GET /todos/:id */
exports.getTodoById = (req, res) => {
    const id = req.params.id;
    const user_id = req.user._id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: user_id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
};

/* DELETE /todos/:id */
exports.deleteTodoById = (req, res) => {
    const id = req.params.id;
    const user_id = req.user._id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: user_id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
};

/* PATCH /todos/:id */
exports.updateTodoById = (req, res) => {
    const id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);
    const user_id = req.user._id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: user_id
    },{
        $set: body
    },{
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
};