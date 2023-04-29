const extrusionRouter = require('express').Router()
const { validarJWT } = require('../Middlewares/validar-jwt')
const Client = require('../models/Client')
const Extrusion = require('../models/Extrusion')

extrusionRouter.get('/', async(req, res) => {
    const extrusion = await Extrusion.find({})

    if(!extrusion){
        return res.status(404).json({
            error : 'no hay extrucion'
        })
    }
    res.json(extrusion)
})
extrusionRouter.post('/' ,[validarJWT], async (req, res) => {
    
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


    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const finishDate = `${day}/${month}/${ year }`

    const newExtrusion = new Extrusion({ 
        important,
        state,
        material,
        size,
        tratado,
        weight,
        meters,
        client,
        date : finishDate
    })


    try {
        await newExtrusion.save()

        const allExtrusions = await Extrusion.find({})

        res.json(allExtrusions)

    } catch (error) {
        console.log(error)
    }
})

extrusionRouter.patch('/:id', async(req, res) => {
    const {id} = req.params

    const {
        important = false,
        state = false ,
        stateAcount = false,
        isPrinter = false,
        isExtrusion = true,
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
extrusionRouter.delete('/:id', async(req, res) => {

    const { id } = req.params

    const extrusion = await Extrusion.findByIdAndDelete(id)

    if(!extrusion){
        return res.status(404).json({
            error : 'No existe esa tarea de extrusion'
        })
    }

    const allExtrusions = await Extrusion.find({})

    res.json(allExtrusions)
})
extrusionRouter.patch('/stateT/:id', async(req, res) => {

    const { id } = req.params

    const extrusion = await Extrusion.findById(id)

    if(!extrusion){
        return res.status(404).json({
            error : 'No existe esa tarea'
        })
    }

    extrusion.state = true

    await extrusion.save()

    const allExtrusion = await Extrusion.find({})

    res.json(allExtrusion)
})
extrusionRouter.patch('/stateF/:id', async(req, res) => {

    const { id } = req.params

    const extrusion = await Extrusion.findById(id)

    if(!extrusion){
        return res.status(404).json({
            error : 'No existe esa tarea'
        })
    }

    extrusion.state = false

    await extrusion.save()

    const allExtrusion = await Extrusion.find({})

    res.json(allExtrusion)
})
module.exports = extrusionRouter
