//express router
var express = require('express');
const app = require('../app');
var router = express.Router();
//pasword hashing
const bcrypt = require('bcrypt');
//jwt
var jwt = require('jsonwebtoken');
const auth = require('./auth');
//import passport 
const passport = require('passport');
//import schema
const User = require('../models/Users');
//secret key 
require('dotenv').config();
const secret = process.env.SECRET;
router.get('/register', (req,res) => {
  try{
    res.render('register', {title:"Register"})
  } catch (error){
    res.status(400).json({error:error.message})
  }
  
});
//register
router.post('/register',  async (req,res)=> {
    try {
      //get user info from request body
      const { firstName, lastName, email, password,username } = req.body
      if (!(email && password && firstName && lastName && username)) {
        res.status(400).send("All input is required");
      }  
      //check if user already exists 
      const oldUser = await User.findOne({ email })
      console.log(oldUser);
      if(oldUser){
        res.status(409).send('User already exists. Please login ')
      }
      User.register(({
        first_name:firstName,
        last_name:lastName,
        email:email.toLowerCase(),
        username:username
      }), password, function (err, user) {
        if(err) {
          console.log("Your account could not be save.")
          res.redirect('/register')
        } else {
          passport.authenticate('local')(req,res,function() {
            console.log("Your account has been saved")
            res.redirect('/login')
          })
         
        }
      })
      
     
    } catch (error) {
      res.status(400).json({error:error.message})
    }
});
//get login
router.get('/login' ,(req,res)=> {
  try{
    res.render('login', {title: "Login"})
  } catch (error) {
    res.status(400).json({error:error.message})
  }
});
//post login
router.post('/login',  (req,res)=> {
  
      const user = new User({
        username: req.body.username,
        password:req.body.password
      });
     req.login(user,function(err) {
       if(err) {
         console.log(err)
       } else {
          passport.authenticate('local')(req,res,function() {
            res.redirect('/messages');
          });
       }
     })
  }

);
  
module.exports = router;
