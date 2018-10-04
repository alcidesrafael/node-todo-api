# node-todo-api

A RESTful API for a to-do list built with NodeJS

# Installation
## Running locally

**Requirements:** NodeJS and MongoDB.

1. Clone this repository
2. Run `$ npm install` in the node-todo-api/ directory
3. Create a `config.json` file in src/config/ directory with your environment variables
```js
//node-todo-api/src/config/config.json
{
    {
    "test": {
        "PORT": 3003,
        "MONGODB_URI": "mongodb://localhost:27017/TodoAppTest",
        "JWT_SECRET": "YOUR_TEST_SECRET_KEY"
    },
    "development":{
        "PORT": 3000,
        "MONGODB_URI": "mongodb://localhost:27017/TodoAppDev",
        "JWT_SECRET": "YOUR_DEV_SECRET_KEY"
    }
}
```
4. Test the application usign `$ npm test`. All the tests should pass without errors
5. Start the server using `$ npm start`. Should be available on port 3000

# API Routes

```
Users Routes
POST http://localhost:3000/users // create a new user
GET http://localhost:3000/users/me'// get user if auth
POST http://localhost:3000/users/login' // login
DELETE http://localhost:3000/users/me/token' // loggout

Todos Routes
POST http://localhost:3000/todos // insert a new todo
GET http://localhost:3000/todos // get all todos
GET http://localhost:3000/todos/:id // get todo by id
DELETE http://localhost:3000/todos/:id // delete a todo by id
PATCH http://localhost:3000/todos/:id' // update a todo
```
