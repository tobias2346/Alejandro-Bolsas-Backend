// const mongoose = require('mongoose')
// const {Schema, model} = mongoose

// const taskSchema = new Schema({
//     date: Date,
//     important: Boolean,
//     material: String,
//     size: String,
//     colors: String,
//     heads: String,
//     state : Boolean,
//     weight : String,
//     meters : String,
//     client : String
// })

// taskSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id,
//         delete returnedObject._id,
//         delete returnedObject.__v
//     }
// })

// const Task = model('Task', taskSchema)  

// module.exports = Task 