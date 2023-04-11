const mongoose = require('mongoose')
const {Schema, model} = mongoose

const diarySchema = new Schema({
    important: Boolean,
    state : Boolean,
    text: String,
    date: String
})

diarySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

const Diary = model('Diary', diarySchema)

module.exports = Diary
