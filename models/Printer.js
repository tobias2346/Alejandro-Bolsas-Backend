const mongoose = require('mongoose')
const {Schema, model} = mongoose

const printerSchema = new Schema({
    important: Boolean,
    material: String,
    size: String,
    colors: String,
    heads: String,
    state : Boolean,
    weight : String,
    meters : String,
    client : String,
    date: String
})

printerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
})
const Printer = model('Printer', printerSchema)

module.exports = Printer