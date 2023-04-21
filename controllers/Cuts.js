const cutRouter = require('express').Router()
const Cut = require('../models/Cut')
const { validarJWT } = require('../Middlewares/validar-jwt')

cutRouter.get('/', async(req, res) => {

    const cut = await Cut.find({})

    if(!cut){
        return res.status(404).json({
            error : 'no hay extrucion'
        })
    }
    res.json(cut)
})
cutRouter.post('/' ,[validarJWT], async (req, res) => {
    
    const {
        important = false,
        state = false,
        material,
        size,
        client,
        quantity,
    } = req.body

    if(!client || !quantity || !material || !size){
        return res.status(404).json({
            error : 'Algunos campos son obligatorios'
        })
    }
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const finishDate = `${day}/${month}/${ year }`

    const newCut = new Cut({ 
        important,
        state,
        material,
        size,
        client,
        quantity,
        date : finishDate
    })


    try {
        await newCut.save()

        const allCuts = await Cut.find({})

        res.json(allCuts)

    } catch (error) {
        console.log(error)
    }
})
cutRouter.delete('/:id', async(req, res) => {

    const { id } = req.params

    const cut = await Cut.findByIdAndDelete(id)

    if(!cut){
        return res.status(404).json({
            error : 'No existe esa tarea de extrusion'
        })
    }

    const allCuts = await Cut.find({})

    res.json(allCuts)
})
cutRouter.patch('/stateT/:id', async(req, res) => {

    const { id } = req.params

    const cut = await Cut.findById(id)

    if(!cut){
        return res.status(404).json({
            error : 'No existe esa tarea'
        })
    }

    cut.state = true

    await cut.save()

    const allCuts = await Cut.find({})

    res.json(allCuts)
})
cutRouter.patch('/stateF/:id', async(req, res) => {

    const { id } = req.params

    const cut = await Cut.findById(id)

    if(!cut){
        return res.status(404).json({
            error : 'No existe esa tarea'
        })
    }

    cut.state = false

    await cut.save()

    const allCuts = await Cut.find({})

    res.json(allCuts)
})
module.exports = cutRouter
