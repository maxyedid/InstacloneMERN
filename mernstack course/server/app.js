const express = require('express')
const app = express();
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')

const PORT = 3000;


mongoose.connect(MONGOURI);

mongoose.connection.on('connected', () => {
    console.log("Connected into the mongoose database")
})


mongoose.connection.on('error', (err) => {
    console.log("error connecting " + err);
})

require('./models/user')
require('./models/post')
mongoose.model("User");
mongoose.model("Post")

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


app.listen(PORT, () => {
    console.log("connection terminated on " + PORT);
})