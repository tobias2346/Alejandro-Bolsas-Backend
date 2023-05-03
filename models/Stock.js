const mongoose = require('mongoose')
const {Schema, model} = mongoose

const stockSchemma = new Schema({
    title : String,
    important: Boolean,
    tasks : [{
        date: String,
        important: Boolean,
        size: String,
        total : Number
    }]
})

stockSchemma.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

const Stock = model('Stock', stockSchemma)
  
module.exports = Stock 