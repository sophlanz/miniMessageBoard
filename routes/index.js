const { response } = require('express');
var express = require('express');
var router = express.Router();
const Message = require('../models/Message');
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


/* GET home page. */
router.get('/', async function(req, res) {
    try{
      const message = await Message.find()
      
      res.render('index', {title: "Mini Message Board", messages:message})
    } catch(err) {
      res.status(500).json({message:err.message})
    }
})

// form for creating new messages
router.get('/new', (req,res,next)=> {
  res.render('form', {title:"Create New Message" })
})
//handle post req
router.post('/new', (req,res)=> {
  const message = new Message({
    text: req.body.message, 
    user: req.body.name, 

  });
  try {
    //save message
    message.save();
    //send back to main page with messages
    res.redirect('/');
  } catch (err) {
    res.status(400).json({message:err.message})
  }
  
})


//Post Method
router.post('/post', (req, res) => {
  res.send('Post API')
})

//Get all Method
router.get('/getAll', (req, res) => {
  res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
  res.send(req.params.id)
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
  res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API')
})

module.exports = router;
