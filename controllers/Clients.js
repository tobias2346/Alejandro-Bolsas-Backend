const clientRouter = require('express').Router()
const Client = require('../models/Client')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

clientRouter.get('/', async(req, res) => {
    const client = await Client.find({})

    if(!client){
        return res.status(404).json({
            error : 'no hay clientes'
        })
    }
    res.json(client)
})
clientRouter.get('/forUser' , async(req, res) => {

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

    const clientsArray = user.clients

    res.json(clientsArray)
 

})
clientRouter.get('/:id' ,async(req, res) => {
    const {id} = req.params

    const client = await Client.findById(id)

    if(!client){
        res.status(404).json({
            error : 'El cliente no existe'
        })
    }

    res.json(client)
})
clientRouter.post('/' , async (req, res) => {
    
    const {
        title, 
        important = false
    } = req.body

    if(!title){
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

    const newClient = new Client({ 
        title,
        important,
        date: new Date(),
        user: user.id
    })


    try {
        const clientSaved = await newClient.save()

        user.clients = user.clients.concat(clientSaved._id)

        await user.save()
    
        const clients = await Client.find({})

        res.json(clients)

    } catch (error) {
        console.log(error)
    }
})
clientRouter.delete('/:id',async (req, res) => {
    const {id} = req.params
    
    const deleteClient = await Client.findByIdAndDelete(id)

    if(!deleteClient){
        res.status(404).json({
            error : 'el cliente no existe'
        })
    }

    const clients = await Client.find({})


    res.json(clients)
    
})

module.exports = clientRouter





