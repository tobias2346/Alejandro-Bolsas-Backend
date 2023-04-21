const mongoose = require('mongoose')
const {Schema, model} = mongoose

const extrusionSchema = new Schema({
    important: Boolean,
    material: String,
    size: String,
    tratado: String,
    state : Boolean,
    weight : String,
    meters : String,
    client : String,
    date: String
})

extrusionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
})
const Extrusion = model('Extrusion', extrusionSchema)

module.exports = Extrusion