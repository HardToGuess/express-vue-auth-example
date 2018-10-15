const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const User = mongoose.model('Users', UserSchema)

module.exports = {
    User
}