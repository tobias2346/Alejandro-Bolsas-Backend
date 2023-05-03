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
extrusionRouter.patch('/edit/:id', async(req, res) => {

    const {id} = req.params

    const {
        important = false,
        state = false ,
        material,
        tratado,
        meters,
        weight,
        size,
        client
    } = req.body

    const extrusion = await Extrusion.findById(id)

    if(!extrusion){
        res.status(404).json({
            error : 'Tarea de extrusion inexistente'
        })
    }
    
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const finishDate = `${day}/${month}/${ year }`

    const newArr = { 
        important,
        date : finishDate,
        state,
        material,
        tratado,
        meters,
        weight,
        size,
        client
    }
    try {
        
        await Extrusion.findByIdAndUpdate(id, newArr, {new : true})
    
        const allExtrusions = await Extrusion.find({})

        res.json(allExtrusions)

    } catch (error) {
        res.status(404).json({
            "error" : "La tarea no se pudo actualizar"
        })
        console.log(error)
    }


})
module.exports = extrusionRouter
