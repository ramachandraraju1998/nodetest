const express = require("express");
const User = require('../models/user')
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/user/signup",(req,res)=>{

    if(!req.body.email){
        return res.status(400).json({
            status: "error",
            message: "Email required"
        })
    }
    if(!req.body.password){
        return res.status(400).json({
            status: "error",
            message: "password requried"
        })
    }
    try {
        const user = new User(req.body)
        user.save();
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Invalid credentials!"
            })
        }
     
             res.status(200).json({
                status:"success",
                message: "Account Created!"
            })

    } catch (e) {
         res.status(500).json({
            status: "error",
            message: e.message
        })
    }

});

router.post('/user/signin', async (req, res) => {
    try {
        const user = await User.findUser(req.body.email, req.body.password)
        //console.log(user)
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Invalid credentials!"
            })
        }
        const token = await user.generateAuthToken()
        if (user) {
            return res.status(200).json({
                status:"success",
                message:"ok",
                token,
            })
        }

    } catch (e) {
         res.status(500).json({
            status: "error",
            message: e.message
        })
    }
})


router.post("/user/getusers",auth,async(req,res)=>{
    try {
        const user = await User.getUsers()
        console.log(user)
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Invalid credentials!"
            })
        }

        if (user) {
            return res.status(200).json({
                status: "success",
                users: user   
            })
        }

    } catch (e) {
         res.status(500).json({
            status: "error",
            message: e.message
        })
    }

});

module.exports = router;