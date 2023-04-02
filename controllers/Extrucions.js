const extrucionRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Printer = require('../models/Printer')
const Extrucion = require('../models/Extrucion')

extrucionRouter.get('/', async(req, res) => {
    const extrucion = await Extrucion.find({})

    if(!extrucion){
        return res.status(404).json({
            error : 'no hay extrucion'
        })
    }
    res.json(extrucion)
})
extrucionRouter.post('/' , async (req, res) => {
    
    const {
        important = false,
        state = false,
        material,
        tratado,
        meters,
        weight,
        size,
        client
    } = req.body

    if(!material || !size || !tratado || !weight  ||  !meters || !client){
        return res.status(400).json({
            error : 'Faltan datos para ingresar un nuevo trabajo de extrucion'
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

    const newExtrucion = new Extrucion({ 
        important,
        state,
        material,
        size,
        tratado,
        weight,
        meters,
        client 
    })

    const allExtrucions = await Extrucion.find({})

    try {
        await newExtrucion.save()

        res.json(allExtrucions)

    } catch (error) {
        console.log(error)
    }
})
extrucionRouter.delete('/:id', async(req, res) => {

    const { id } = req.params

    const extrucion = await Extrucion.findByIdAndDelete(id)

    if(!extrucion){
        return res.status(404).json({
            error : 'No existe esa tarea'
        })
    }

    const allExtrucions = await Extrucion.find({})

    res.json(allExtrucions)
})
extrucionRouter.patch('/stateT/:id', async(req, res) => {

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
extrucionRouter.patch('/stateF/:id', async(req, res) => {

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
module.exports = extrucionRouter
