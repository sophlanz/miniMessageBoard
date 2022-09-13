//authorized routes after login
const passport = require('passport');

const Users = require('../models/Users');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(Users.authenticate()));