const mongoose = require('mongoose')
const {Schema, model} = mongoose

const userSchema = new Schema({
    username: String,
    name: String,
    passwordHash: String,
    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})
const User = model('User', userSchema)

module.exports = User