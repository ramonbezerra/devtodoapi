var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET todos listing. */
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

module.exports = router;
