const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_title :{
        type: String
    },
    todo_desc :{
        type: String
    }
});

module.exports = mongoose.model('Todo', Todo);