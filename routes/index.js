const { response } = require('express');
var express = require('express');
var router = express.Router();
const Message = require('../models/Message');

//on homepage, get messages
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
//handle post request on submit of new message
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
//get by id
router.get('/getOne/:id', async (req, res) => {
  try{
    const message = await Message.findById(req.params.id)
    res.json(message)

  } catch (error) {
    res.status(500).json({error:error.message})
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


//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
        const id = req.params.id;
        const updatedMessage = req.params.message;
        const options = {new:true}
        const update = await Message.findByIdAndUpdate (
          id, updatedMessage, options
        )
        res.send(update);
  }
  catch(error) {
    res.status(400).json({error:error.message})
  }
});

//Delete by ID Method
router.post('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
   const message = await Message.findByIdAndDelete(id)
   res.send(`Document with ${message.user} has been deleted`)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
});

module.exports = router;
