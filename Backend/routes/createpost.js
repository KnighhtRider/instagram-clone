// import { modalCaption, modalUrl } from '@/atoms/modalAtom'
// import React from 'react'
// import { useRecoilState } from 'recoil'


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const requireLogin = require('../middlewares/requireLogin');


const POST = mongoose.model('POST');


// router.get('/createpost', (req, res) => {
//   res.send('<h1> Create Post </h1>')
// })


router.post('/', (req, res) => {
  // console.log(req.body)
  const {caption, pic} = req.body;
  // console.log(pic);
  if(!caption || !pic) {
    return res.status(422).json({error: 'Please Add all the Fields'})
  }

  const post = new POST({
    caption,
    photo:pic
  })


  post.save().then((result) => {
    return res.json({post: result})
  }).catch((err) => console.log(err))

})


  




module.exports = router