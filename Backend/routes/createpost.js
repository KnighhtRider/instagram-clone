const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');


const POST = mongoose.model('POST');
const USER = mongoose.model('USER')


router.get('/createpost', requireLogin, (req, res) => {
  POST.find()
  .populate('postedBy', '_id name userName Photo')
  .populate('comments.postedBy', '_id name userName Photo')
  .sort('-createdAt')
  .then((posts) => res.json(posts))
  .catch(err => console.log(err))
  

})




router.post('/createpost', requireLogin, (req, res) => {
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
  .sort('-createdAt')
  .then(myposts => {
    res.json(myposts)
  })
})




router.put('/like', requireLogin, (req, res) => {
  
  POST.findByIdAndUpdate(req.body.postId, {
    $push: {likes: req.user._id} 
  }, {
    new:true
  })
  .populate('postedBy', '_id userName Photo')
  .then((result) => res.json(result))
  .catch((err) => console.log(err))
})

router.put('/unlike', requireLogin, (req, res) => {
  
  POST.findByIdAndUpdate(req.body.postId, {
    $pull: {likes: req.user._id} 
  }, {
    new:true
  })
  .populate('postedBy', '_id userName Photo')
  .then((result) => res.json(result))
  .catch((err) => console.log(err))
})


router.put('/comment', requireLogin, (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id
  }
  POST.findByIdAndUpdate(req.body.postId, {
    $push: {comments:comment}
  }, {
    new: true
  })
  .populate('postedBy', '_id name userName')
  .populate('comments.postedBy', '_id name userName')
  .then(result => {res.json(result)})
  .catch((err) => res.status(422).json({error: err}))
})


/* To Delete post */
router.delete('/deletepost/:postId', requireLogin, (req, res) => {
  // console.log(req.params.postId);
  POST.findOne({_id: req.params.postId})
  .populate('postedBy', '_id')
  .then((post) => {
    // console.log(post.postedBy._id.toString() == req.user._id.toString())
    if(post.postedBy._id.toString() == req.user._id.toString()) {
      post.deleteOne()
      .then((result) => {
        res.json({message: 'Successfully deleted'})
      })
      .catch((err) => {console.log(err)})
    }
  })
  .catch((err) => res.status(422).json({error: err}))
})



module.exports = router