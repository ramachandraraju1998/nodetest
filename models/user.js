const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken'); 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'Email Exists'],
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: false
        }
    }]
}, {
    timestamps: true
}, {
    versionKey: false
})


userSchema.statics.findUser = async (email, password) => {
    const user = await User.findOne({
        email
    })
    if (!user) {
        throw new Error('User Doesnot Exist!')
    }

    const isMatch = (password==user.password)?true:false;
    if (!isMatch) {
        throw new Error("Invalid Credentials!")
    }
    return user
}


userSchema.statics.getUsers = async () => {
    const user = await User.find({})
    const users = user.map((user)=>{
        return {user:user.email,password:user.password}
    });
    if (!user) {
        throw new Error('Users doesnt exists!')
    }
    return users
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString()
    }, "test")
    user.tokens = user.tokens.concat({
        token
    })
    await user.save()
    return token
}
const User = mongoose.model('User', userSchema)
module.exports = User