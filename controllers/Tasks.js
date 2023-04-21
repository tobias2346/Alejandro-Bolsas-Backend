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
        stateAcount = false,
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
    if( !client || !material || !size || !meters || !cuenta){
        return res.status(404).json({
            error : 'Algunos campos son obligatorios'
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
taskRouter.patch('/discount/:id', async(req, res) => {

    const {id} = req.params

    const {
        stateAcount = true,
        cuenta
    } = req.body

    if(isNaN(cuenta)){
        return res.status(404).json({
            error : 'La cuenta tiene que ser un numero'
        })
    }

    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const finishDate = `${day}/${month}/${ year }`

    const existClient = await Client.findById(id)

    if(!existClient){
        res.status(404).json({
            error : 'Cliente inexistente'
        })
    }
    await Client.findByIdAndUpdate(id,
        {   tasks : [{ 
            stateAcount,
            date : finishDate,
            cuenta},...existClient.tasks]
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
