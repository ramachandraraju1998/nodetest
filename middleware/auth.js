const jwt = require('jsonwebtoken')
const User = require('../models/user')
const dotenv = require('dotenv'); 
dotenv.config(); 
const auth = async (req, res, next) => {
    try {
        if(!req.header('Authorization')){
            return res.status(401).send({status:"error",message:"Token required"});
        }
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = await jwt.verify(token, "test")
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error("User Not Logged in!")
        }
        if (!user) {
            throw new Error("Please Verify Your Account!")
        }
        req.body.token = token
        //req.body.user = user;
        req.body.user_id = user._id;      
        next()
    }
    catch (e) {
      return res.status(401).send({ status: "error", message: e.message })
    }

}

module.exports = auth