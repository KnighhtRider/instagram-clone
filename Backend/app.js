const express = require('express')
const app = express();
const cors = require('cors')


const mongoose = require('mongoose');
const { mongoUrl } = require('./secrets/keys')
app.use(cors())

/* user models import */
require('./models/model')
require('./models/post')

app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/createpost'))
app.use(require('./routes/user'))


/* db connection  */
mongoose.connect(mongoUrl)
.then(() => {
  console.log("Yeah! DB Connected Succesfully...");
})
.catch((err) => {
  console.log(err);
})




/* server running on port 3000 */
app.listen(5000, () => {
  console.log('server is running on port 5000');
})




