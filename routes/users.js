var express = require('express');
var router = express.Router();

var User = require('../models/users')
var Todo = require('../models/todo')
router.post('/addUser',(req,res,next)=>{
  const user = new User(req.body)
  user.save().then((createdUser)=>{
    console.log("user created");
    res.status(201).json({
      message: "user created",
      user : createdUser
    })
  }).catch(err=>{
    console.log(err);
  })
})
router.get('/allUsers',(req,res,next)=>{
  User.find().then((u) => {
   res.status(200).json({
     message: "all users",
     user: u
   })
 }).catch(err => {
   console.log(err);
 });
 })

 router.get('/getUserById/:id',(req,res)=>{
  User.findById(req.params.id).then((u) => {
    res.status(200).json({
           user: u
    })
  }).catch(err => {
    console.log(err);
  });
  })

 
router.delete('/delete/:id', async(req,res,next)=>{
const user =   await User.findByIdAndDelete(req.params.id).exec()
res.json(user)
});

 
router.put('/update/:id', async (req,res,next)=>{
   await User.findByIdAndUpdate(req.params.id,req.body).exec();
   res.json(req.body)
});


router.post('/affectationTodoUser/:idUser/:idTodo',(req,res,next)=>{
  Todo.findById(req.params.idTodo).then(todo=>{
    User.findOneAndUpdate(req.params.idUser , 
      { $push: {todos : todo  } }
      ).then(()=>
      {  
    res.status(201).json({
      message: "updated successfully! ",
    })
  }).catch(err=>{
    res.status(400).json({
      error: err
  });
});
  })
})
 
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// /* Post users listing. */
// router.post('/addUser',(req,res, next)=>{
//   console.log(req.body);
//   res.json(req.body);
// })

// router.get('/gettAll',(req,res, next)=>{
//   res.json({message: "all"});
// }) 

// router.get('/getUserById/:id',(req,res, next)=>{
//   res.json({message: "this is the user number"+req.params.id});
// })
// router.put('/updateUser/:id',(req,res, next)=>{
//   res.json({message: " messssage" +req.params.id+ "updated"})
// })
module.exports = router;
