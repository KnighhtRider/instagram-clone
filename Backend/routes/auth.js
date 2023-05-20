const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const USER = mongoose.model('USER');
const bcrypt = require('bcrypt')

router.get('/signup', (req, res) => {
  res.send('<h1>I am Get Request From Sign Up.</h1>')
})


router.post('/signup', (req, res) => {
  const {name, userName, email, password} = req.body;

  if(!name || !userName || !email || !password ) {
    res.status(422).json({error: "Please add all the fields"})
  }

  USER.findOne({$or: [{email: email,}, {userName: userName}]}).then((savedUser) => {
    if(savedUser) {
      return res.status(422).json({err: "User Already exist with that email or username."})
    } 
    bcrypt.hash(password, )
    const user = new USER({
      name,
      email,
      userName,
      password
    })
  
    /* data send to db */
    user.save()
    .then((user) => {
      res.json({message: 'saved successfully'})
    })
    .catch((err) => console.log(err)) 
  })


})


module.exports = router;



