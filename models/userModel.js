const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const assert = require('node:assert')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function (email, password) {

    //validation
    assert(email && password, 'All fields must be filled')
    assert(typeof email === 'string', 'Email must be a string')
    assert(typeof password === 'string', 'Password must be a string')
    assert(validator.isEmail(email), 'Email is not valid')
    assert(validator.isStrongPassword(password), 'Password not strong enough')

    const exists = await this.findOne({ email })

    assert(!exists, 'Email already in use')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

//static login method
userSchema.statics.login = async function (email, password) {
    
    assert(email && password, 'All fields must be filled')
    assert(typeof email === 'string', 'Email must be a string')
    assert(typeof password === 'string', 'Password must be a string')

    const user = await this.findOne({ email })

    assert(user, 'Email does not exist')
    assert(await bcrypt.compare(password, user.password), 'Incorrect password')

    return user
}

module.exports = mongoose.model('User', userSchema)