const mongoose = require('mongoose')
const {Schema, model} = mongoose

const clientSchema = new Schema({
    title : String,
    important: Boolean,
    user: String,
    tasks : [{
        date: String,
        important: Boolean,
        material: String,
        size: String,
        colors: String,
        heads: String,
        state : Boolean,
        stateAcount: Boolean, 
        isPrinter: Boolean,
        isExtrusion : Boolean,
        isDiary : Boolean,
        weight : String,
        meters : String,
        client : String,
        tratado : String,
        cuenta : Number
    }]
})

clientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

const Client = model('Client', clientSchema)
  
module.exports = Client 