const printerRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Printer = require('../models/Printer')

printerRouter.get('/', async(req, res) => {
    const printer = await Printer.find({})

    if(!printer){
        return res.status(404).json({
            error : 'no hay impresion'
        })
    }
    res.json(printer)
})
printerRouter.post('/' , async (req, res) => {
    
    const {
        important = false,
        state = false,
        material,
        heads,
        meters,
        weight,
        size,
        colors,
        client
    } = req.body

    if(!material || !size || !colors || !heads || !meters || !client){
        return res.status(400).json({
            error : 'Faltan datos para ingresar un nuevo cliente'
        })
    }

    const authorization = req.get('authorization')

    let token = ''
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }

    let decodedToken = {} 

    try {
        decodedToken = jwt.verify(token, '123')
    } catch (e) {
        console.log(e)
    }

    if(!token || !decodedToken.id){
        return res.status(401).json({
            error: 'no autorizado' 
        })
    }
    
    let {id: userId} = decodedToken
    
    const user = await User.findById(userId)

    if(!user){
        return res.status(404).json({
            error: 'Usuario inexistente' 
        })
    }

    const newPrinter = new Printer({ 
        important,
        state,
        date: new Date(),
        material,
        size,
        colors,
        heads,
        weight,
        meters,
        client 
    })

    const allPrinters = await Printer.find({})

    try {
        await newPrinter.save()

        res.json(allPrinters)

    } catch (error) {
        console.log(error)
    }
})
printerRouter.delete('/:id', async(req, res) => {

    const { id } = req.params

    const printer = await Printer.findByIdAndDelete(id)

    if(!printer){
        return res.status(404).json({
            error : 'No existe esa tarea'
        })
    }

    const allPrinters = await Printer.find({})

    res.json(allPrinters)
})
printerRouter.patch('/stateT/:id', async(req, res) => {

    const { id } = req.params

    const printer = await Printer.findById(id)

    if(!printer){
        return res.status(404).json({
            error : 'No existe esa tarea'
        })
    }

    printer.state = true

    await printer.save()

    const allPrinters = await Printer.find({})

    res.json(allPrinters)
})
printerRouter.patch('/stateF/:id', async(req, res) => {

    const { id } = req.params

    const printer = await Printer.findById(id)

    if(!printer){
        return res.status(404).json({
            error : 'No existe esa tarea'
        })
    }

    printer.state = false

    await printer.save()

    const allPrinters = await Printer.find({})

    res.json(allPrinters)
})
module.exports = printerRouter
