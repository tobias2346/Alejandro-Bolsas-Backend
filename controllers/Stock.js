const stockRouter = require('express').Router()
const { validarJWT } = require('../Middlewares/validar-jwt')
const Stock = require('../models/Stock')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

stockRouter.get('/', async(req, res) => {
    const stock = await Stock.find({})

    if(!stock){
        return res.status(404).json({
            error : 'no hay ningun stock anotado'
        })
    }

    res.json(stock)
})
stockRouter.post('/' ,[validarJWT], async (req, res) => {
    
    const {
        title, 
        important = false
    } = req.body

    if(!title){
        return res.status(400).json({
            error : 'Faltan datos para ingresar un nuevo stock'
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

    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const finishDate = `${day}/${month}/${ year }`

    const newStock = new Stock({ 
        title,
        important,
        date: finishDate
    })


    try {

        await newStock.save()
    
        const stock = await Stock.find({})

        res.json(stock)

    } catch (error) {
        console.log(error)
    }
})
stockRouter.delete('/:id',async (req, res) => {

    const {id} = req.params
    
    const deleetStock = await Stock.findByIdAndDelete(id)

    if(!deleetStock){
        res.status(404).json({
            error : 'El stock no existe'
        })
    }

    const stock = await Stock.find({})

    res.json(stock)
    
})

module.exports = stockRouter





