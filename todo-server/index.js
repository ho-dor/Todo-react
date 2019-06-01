const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;
const routes = express.Router();
const Todo = require('./model.js');

app.use(cors())
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mytodo', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

routes.route('/').get((req, res) => {
    Todo.find((err,todos) => {
        if (!err) {
            res.json(todos);
        }
    })
})

routes.route('/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save().
        then(() => {
            res.status(200).json({ 'todo': 'todo saved' });
        })
})

routes.route('/:id').get((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        res.json(todo);
        })
})

routes.route('/update/:id').post((req, res) => {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
        todo.todo_title = req.body.todo_title;
        todo.todo_desc = req.body.todo_desc;

        todo.save().then(todo => {
            res.json('Todo updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
})
app.use('/todos', routes);

app.listen(PORT, () => {
    console.log("Listening...");
});
