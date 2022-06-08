const mongoose = require('mongoose')
const {Schema} = mongoose
const user = new Schema({
    username:String,
    email:String,
    password:String,
})

const userSchema = mongoose.model('user', user )
module.exports = {userSchema}