const express = require('express')
const app = express();

const mongoose = require('mongoose');
const mongoUrl = require('./secrets/keys')

/* user models import */
require('./models/model')
require('./models/post')

app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/createpost'))

/* db connection  */
mongoose.connect(mongoUrl)
.then(() => {
  console.log("Yeah! DB Connected Succesfully...");
})
.catch((err) => {
  console.log(err);
})


app.listen(3000, () => {
  console.log('server is running on port 3000');
})




