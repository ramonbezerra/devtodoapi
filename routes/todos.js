var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET todos listing */
router.get('/', function(req, res, next) {
  model.Todo.findAll({})
    .then(todos => res.json({
        error: false,
        data: todos
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        message: error
    }));
});

/* GET todos listing by status */
router.get('/:done', function(req, res, next) {
    model.Todo.findAll({
        where: {
            done: req.params.done == 'true' ? true : false
        }
    })
    .then(todos => res.json({
        error: false,
        data: todos
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        message: error
    }));
});

/* POST todo */
router.post('/', function(req, res, next) {
    const {name} = req.body;
    model.Todo.create({
        name: name,
        done: false
    })
    .then(todo => res.status(201).json({
        error: false,
        data: todo,
        message: 'New todo has been created'
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        message: error
    }));
});

router.put('/:id', function(req, res, next) {
    const id = req.params.id;
    const {name, done} = req.body;
    model.Todo.update({
        name: name,
        done: done
    },{ 
        where: {
            id: id
        }
    })
    .then(todo => res.status(201).json({
        error: false,
        message: 'todo has been updated'
    }))
    .catch(error => res.json({
        error: true,
        message: error
    }));
});

router.delete('/:id', function(req, res, next) {
    const id = req.params.id;
    model.Todo.destroy({
        where: {
            id: id
        }
    })
    .then(todo => res.status(201).json({
        error: false,
        message: 'todo has been deleted'
    }))
    .catch(error => res.json({
        error: true,
        message: error
    }));
});

module.exports = router;
