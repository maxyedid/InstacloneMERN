const express = require('express')
const app = express();
const mongoose = require('mongoose')
const {MONGOURI} = require('./config/keys')
const cors = require('cors');


const PORT = process.env.PORT || 4000;

app.use(cors());

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
app.use(require('./routes/user'))

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => {
    console.log("connection terminated on " + PORT);
})