const mongoose = require('mongoose')
const {Schema, model} = mongoose

const stockSchemma = new Schema({
    title : String,
    important: Boolean,
    date: String,
    individualStock : [{
        date: String,
        important: Boolean,
        stateDiscount : Boolean,
        aditionalText : String,
        weightStock: [],
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