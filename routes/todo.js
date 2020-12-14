var express = require('express');
var router = express.Router();
const Todo = require('../models/todo');


router.post('/addTodo',(req,res,next)=>{
  const todo = new Todo(req.body)
  todo.save().then((createdTodo)=>{
    console.log("todo created");
    res.status(201).json({
      message: "todo created",
      todo : createdTodo
    })
  }).catch(err=>{
    console.log(err);
  })
})
router.get('/allTodo',(req,res,next)=>{
  Todo.find().then((u) => {
   res.status(200).json({
     message: "all todo",
     todo: u
   })
 }).catch(err => {
   console.log(err);
 });
 })

 router.get('/getTodoById/:id',(req,res)=>{
  todo.findById(req.params.id).then((u) => {
    res.status(200).json({
           todo: u
    })
  }).catch(err => {
    console.log(err);
  });
  })

 
router.delete('/delete/:id', async(req,res,next)=>{
const todo =   await Todo.findByIdAndDelete(req.params.id).exec()
res.json(todo)
});

 
router.put('/update/:id', async (req,res,next)=>{
   await Todo.findByIdAndUpdate(req.params.id,req.body)
   res.json(req.body)
});

    


module.exports = router;