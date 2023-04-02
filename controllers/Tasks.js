const taskRouter = require('express').Router()
const Client = require('../models/Client')

taskRouter.get('/:id' , async(req, res) => {

    const {id} = req.params

    const client = await Client.findById(id)

    if( !client ){
        res.status(404).json({
            error : 'Cliente inexistente'
        })
    }

    res.json(client.tasks)

})
taskRouter.patch('/:id', async(req, res) => {

    const {id} = req.params

    const {
        important = false,
        state = false ,
        material,
        size,
        colors,
        heads,
        weight,
        meters 
    } = req.body

    const client = await Client.findById(id)

    if(!client){
        res.status(404).json({
            error : 'Cliente inexistente'
        })
    }
    if( !material || !size || !colors || !heads || !weight || !meters ){
        return res.status(400).json({
            error : 'Todos los campos son obligatorios'
        })
    }

    const date = new Date()
    const day = date.getDay()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const finishDate = `${day}/${month}/${ year }`

    await Client.findByIdAndUpdate(id,
        {   tasks : [{ 
            important,
            date : finishDate,
            state,
            material,
            size,
            colors,
            heads,
            weight,
            meters },...client.tasks]
        }
        
    )

    const updateClients = await Client.findById(id)



    res.json(updateClients.tasks)
})
taskRouter.patch('/stateT/:clientId/:i', async(req, res) => {

    const { clientId, i } = req.params

    const client = await Client.findById(clientId)

    if(!client){
        res.status(404).json({
            error : 'Cliente inexistente'
        })
    }

    client.tasks[i].state = true

    await client.save()

    res.json(client)
   
})
taskRouter.patch('/stateF/:clientId/:i', async(req, res) => {

    const { clientId, i } = req.params

    const client = await Client.findById(clientId)

    if(!client){
        res.status(404).json({
            error : 'Cliente inexistente'
        })
    }

    client.tasks[i].state = false

    await client.save()

    res.json(client)
 
    
})
taskRouter.patch('/delete/:clientId/:i', async(req, res) => {
    const { clientId, i} = req.params

    const client = await Client.findById(clientId)

    if(!client){
        res.status(404).json({
            error : 'Cliente inexistente'
        })
    }

    client.tasks.splice( i, 1 )

    console.log(client.tasks)
    await client.save()

    res.json(client.tasks)
 
})
module.exports = taskRouter





