const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")


module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    //authorization === Bearer <token>
    if (!authorization) {
       return res.status(401).send("You should not be here...")
    }
   const token = authorization.replace("Bearer ", "");
   jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      console.log("there is an error here")
       return res.status(401).json({error: "you must be logged in"})
    }
    const {id} = payload;
    User.findById(id).then(userData => {
        req.user = userData
        next()
    })
   })
}