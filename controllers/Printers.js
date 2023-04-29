const printerRouter = require('express').Router()
const Printer = require('../models/Printer')
const { validarJWT } = require('../Middlewares/validar-jwt')
const Client = require('../models/Client')
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

printerRouter.patch('/:id', async(req, res) => {
    const {id} = req.params

    const {
        important = false,
        state = false ,
        stateAcount = false,
        isPrinter = true,
        isExtrusion = false,
        isDiary = false,
        material,
        size,
        colors,
        heads,
        weight,
        meters,
        cuenta,
        tratado,
        client
    } = req.body
    
    if(isNaN(cuenta)){
        return res.status(404).json({
            error : 'La cuenta tiene que ser un numero'
        })
    }


    const existClient = await Client.findById(id)

    if(!existClient){
        res.status(404).json({
            error : 'Cliente inexistente'
        })
    }

    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const finishDate = `${day}/${month}/${ year }`

    await Client.findByIdAndUpdate(id,
        {   tasks : [{ 
            important,
            date : finishDate,
            state,
            stateAcount,
            isPrinter,
            isExtrusion,
            isDiary,
            material,
            size,
            colors,
            heads,
            weight,
            cuenta,
            tratado,
            client,
            meters },...existClient.tasks]
        } 
    )
    const updateClients = await Client.findById(id)
    res.json(updateClients.tasks)
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
