require('./config/config');

/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');

/**
 * Models
 */
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

/**
 * Controllers (route handle)
 */
const TodoController = require('./controllers/todo');
const UserController = require('./controllers/user');

/**
 * Middlewares
 */
const {isAuthenticated} = require('./middleware/auth');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT);
app.use(bodyParser.json());

/**
 * Routes
 */
app.post('/todos', TodoController.postTodos); // insert new todo
app.get('/todos', TodoController.getTodos); // get all todos
app.get('/todos/:id', TodoController.getTodoById); // get todo by id
app.delete('/todos/:id', TodoController.deleteTodoById); // delete a todo by id
app.patch('/todos/:id', TodoController.updateTodoById); // update a todo
app.post('/users', UserController.postUser); // create a new user
app.get('/users/me', isAuthenticated, UserController.getUser); // get user if auth

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});

module.exports = {app};