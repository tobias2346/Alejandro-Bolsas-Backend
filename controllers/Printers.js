const printerRouter = require('express').Router()
const Printer = require('../models/Printer')
const { validarJWT } = require('../Middlewares/validar-jwt')

printerRouter.get('/', async(req, res) => {
    const printer = await Printer.find({})

    if(!printer){
        return res.status(404).json({
            error : 'no hay impresion'
        })
    }
    res.json(printer)
})
printerRouter.post('/' ,[validarJWT], async (req, res) => {
    
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

    if(!client || !heads || !meters || !material || !size || !colors){
        return res.status(404).json({
            error : 'Algunos campos son obligatorios'
        })
    }
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const finishDate = `${day}/${month}/${ year }`


    const newPrinter = new Printer({ 
        important,
        state,
        date: finishDate,
        material,
        size,
        colors,
        heads,
        weight,
        meters,
        client 
    })


    try {
        await newPrinter.save()

        const allPrinters = await Printer.find({})

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
