const mongoose = require('mongoose')
const conectionString = 'mongodb+srv://Alejandro-Bolsas:tobo2004@cluster0.etkyyie.mongodb.net/Alejandro-bolsas'

mongoose.connect(conectionString)
    .then(() => {
        console.log('db Conected')
    }).catch((err) => {
        console.log(err)
    })
