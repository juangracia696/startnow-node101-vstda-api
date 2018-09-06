const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();


var todoArr = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

app.use(bodyParser.json());

var ranObject = {
    status: 'ok'
}

app.get('/', function (req, res) {
    res.send(ranObject);
});

app.get('/api/TodoItems', function (req, res) {
    res.send(todoArr);
});

app.get('/api/TodoItems/:number', (req, res) => {
    let numr = req.params.number;

    for (var i = 0; i < todoArr.length; i++) {
        if (todoArr[i].todoItemId == numr) {
            res.status(200).send(todoArr[i]);
        }
    }
    res.send('incorrect bla');
});

//POST

app.post('/api/TodoItems/', (req, res) => {
    const newPost = {
        todoItemId:    todoArr.length,
        name:          req.body.name,
        priority:      req.body.priority,
        completed:     req.body.completed
    }
    todoArr.push(newPost);
    res.status(201).json(req.body);
});

app.delete('/api/TodoItems/:number',(req, res) => {
    var delObj = [];
    for(var i = 0; i < todoArr.length; i++) {
        console.log('i: ' + i);
        console.log('this: ' + todoArr[i].todoItemId);
        if(req.params.number == todoArr[i].todoItemId) {
            delObj =  todoArr.splice(i,1);
            res.status(200).json(delObj[0]);
            return;
        }
    }
    res.status(500).json(delObj[0]);    
});

module.exports = app;
