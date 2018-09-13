const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:admin55332@ds255332.mlab.com:55332/todo-api');

module.exports = {mongoose};