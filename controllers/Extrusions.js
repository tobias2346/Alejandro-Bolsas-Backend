const extrusionRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
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
extrusionRouter.post('/' , async (req, res) => {
    
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
module.exports = extrusionRouter
