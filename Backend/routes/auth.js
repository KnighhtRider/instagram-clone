const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const USER = mongoose.model('USER');
const bcrypt = require('bcrypt');
const requireLogin = require('../middlewares/requireLogin');
const jwt = require('jsonwebtoken')
const { Jwt_secret } = require('../secrets/keys')




router.get('/signup', (req, res) => {
  res.send('<h1>I am Get Request From Sign Up.</h1>')
})


router.post('/signup', (req, res) => {
  const { name, userName, email, password } = req.body;

  if (!name || !userName || !email || !password) {
    return res.status(422).json({ error: "Please add all the fields" })
  }

  USER.findOne({ $or: [{ email: email, }, { userName: userName }] }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ err: "User Already exist with that email or username." })
    }
    bcrypt.hash(password, 12).then((hashedPswd) => {
      const user = new USER({
        name,
        email,
        userName,
        password: hashedPswd
      })

      /* data send to db */
      user.save()
        .then((user) => {
          res.json({ message: 'Registered Successfully:)' })
        })
        .catch((err) => console.log(err))
    })

  })


})

router.get('/login', (req, res) => {
  res.send('<h1>Get request from Login Page</h1>');
})

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password" })
  }

  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: 'Invalid Email' })
    }
    bcrypt.compare(password, savedUser.password)
    .then((match) => {
      if(match) {
        // return res.status(200).json({message: 'Logged in Successfully'})
        const token = jwt.sign({_id:savedUser.id}, Jwt_secret)
        const {_id, name, email, userName} = savedUser;
        res.json({token, user: { _id, name, email, userName } })
        console.log({token, user: { _id, name, email, userName } });
      } else {
        return res.status(422).json({error: 'Invalid Password'})
      }
    })
    .catch((err) => {console.log(err)})
  })

})



module.exports = router;



