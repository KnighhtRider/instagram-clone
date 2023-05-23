const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');


const POST = mongoose.model('POST');
const USER = mongoose.model('USER')


router.get('/', requireLogin, (req, res) => {
  POST.find()
  .populate('postedBy', '_id name userName')
  .then((posts) => res.json(posts))
  .catch(err => console.log(err))
  

})


// router.get('/miniprofile', requireLogin, (req, res) => {
//   USER.find(req.user)
//   .then((posts) => res.json(posts))
//   .catch(err => console.log(err))
  

// })



router.post('/', requireLogin, (req, res) => {
  // console.log(req.body)
  const {caption, pic} = req.body;
  console.log(pic);
  if(!caption || !pic) {
    return res.status(422).json({error: 'Please Add all the Fields'})
  }

  //console.log(req.user)

  const post = new POST({
    caption,
    photo:pic,
    postedBy: req.user 
  })


  post.save().then((result) => {
    return res.json({post: result})
  }).catch((err) => console.log(err))



})



  
router.get('/myprofile', requireLogin, (req, res) => {
  console.log(req.user)
  POST.find({postedBy:req.user._id})
  .populate('postedBy', '_id name')
  .then(myposts => {
    res.json(myposts)
  })
})


router.put('/like', requireLogin, (req, res) => {
  
  POST.findByIdAndUpdate(req.body.postId, {
    $push: {likes: req.user._id} 
  }, {
    new:true
  }).then((result) => res.json(result))
  .catch((err) => console.log(err))
})

router.put('/unlike', requireLogin, (req, res) => {
  
  POST.findByIdAndUpdate(req.body.postId, {
    $pull: {likes: req.user._id} 
  }, {
    new:true
  }).then((result) => res.json(result))
  .catch((err) => console.log(err))
})


module.exports = router