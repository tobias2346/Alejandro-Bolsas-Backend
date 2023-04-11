const mongoose = require('mongoose')
const {Schema, model} = mongoose

const cutSchema = new Schema({
    important: Boolean,
    material: String,
    size: String,
    state : Boolean,
    client : String,
    quantity : String,
    date: String
})

cutSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
})
const Cut = model('Cut', cutSchema)

module.exports = Cut