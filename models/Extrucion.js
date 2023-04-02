const mongoose = require('mongoose')
const {Schema, model} = mongoose

const extrucionSchema = new Schema({
    important: Boolean,
    material: String,
    size: String,
    tratado: String,
    state : Boolean,
    weight : String,
    meters : String,
    client : String
})

extrucionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
})
const Extrucion = model('Extrucion', extrucionSchema)

module.exports = Extrucion