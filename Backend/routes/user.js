const { query } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const POST = mongoose.model('POST');
const USER = mongoose.model('USER')



/* To get user profile */
router.get('/user/:id', (req, res) => {
  console.log(req.params.id)
  USER.findOne({_id: req.params.id })
  .select('-password')
  .then(user => {
    POST.find({postedBy: req.params.id })
    .populate('postedBy', '_id')
    .then((posts) => {res.json({user, posts})}) 
    .catch((err) => console.log(err))
  })
})


/* To follow user */
router.put("/follow", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(req.body.followId, {
      $push: { followers: req.user._id }
  }, {
      new: true
  })
  .then(() => {
    USER.findByIdAndUpdate(req.user._id, {
      $push: { following: req.body.followId }
    }, {
      new: true
    })
    .then((result) => res.json(result))
    .catch((err) => res.status(422).json({error: err}))
  })
  .catch((err) => console.log(err))
})



/* To unfollow user */
router.put("/unfollow", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(req.body.followId, {
      $pull: { followers: req.user._id }
  }, {
      new: true
  })
  .then(() => {
    USER.findByIdAndUpdate(req.user._id, {
      $pull: { following: req.body.followId }
    }, {
      new: true
    })
    .then((result) => res.json(result))
    .catch((err) => res.status(422).json({error: err}))
  })
  .catch((err) => console.log(err))
})





module.exports = router;