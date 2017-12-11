var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var json = require('../json/tasks.json');
// var db = mongojs('mongodb://saiteja:saiteja@ds129966.mlab.com:29966/tasklist',['tasks']);

var tasks = json;
//get all the tasks
router.get('/tasks',function (req,res,next) {
    res.json(tasks);
});

//get a single tasks
router.get('/tasks/:id',function (req,res,next) {
    db.tasks.find({_id:mongojs.ObjectID(req.params.id)},function (err,task) {
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Saving tasks
router.post('/task',function (req,res,next) {
    var task =req.body;
    if(task.title==''){
        res.status(400);
        res.json({"error":"bad data"});
    }
    else{
        tasks.push(task);
        res.json(tasks);
    }
});

//delete tasks
router.delete('/task/:id',function (req,res,next) {
    var i;
    for (var x = 0; x < tasks.length; x++) {
        if (req.params.id == tasks[x].id) {
            i = x;
        }
    }
    tasks.splice(i, 1 );
    res.json(tasks);
});

//update tasks
router.put('/task/:id',function (req,res,next) {
   var update = req.body;
    for (var x = 0; x < tasks.length; x++) {
        if (req.params.id == tasks[x].id) {
            tasks[x] = update;
        }
    }
    res.json(tasks);
});


//exporting the router so it can be used outside
module.exports = router;