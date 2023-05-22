const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  caption: {
    type: String, 
    required: true,
  },
  photo: {
    type: String,
    require: true,
  },
  postedBy: {
    type: ObjectId,
    ref: 'USER'
  }
})

mongoose.model('POST', postSchema)


