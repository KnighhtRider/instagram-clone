


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/instagram')
.then(() => {
  console.log("connected succesfully...");
})
.catch((err) => {
  console.log(err);
})


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 6,
  },

})


// models 
const userModel = mongoose.model('userModel',userSchema)

async function createUser() {
  let user = {
    name: "Sakshi",
    email: 'abcde@gmail.com',
    password: '1234567',
    confirmPassword: '1234567',
  };

  let data =await userModel.create(user)
  console.log(data);
}

createUser();
