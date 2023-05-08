const individualStockRouter = require('express').Router()
const Stock = require('../models/Stock')

individualStockRouter.get('/:id' , async(req, res) => {
//el id es de la agrupacion del stock

    const {id} = req.params

    const stock = await Stock.findById(id)

    if( !stock ){
        res.status(404).json({
            error : 'Cliente inexistente'
        })
    }

    res.json(stock)

})
individualStockRouter.patch('/:id', async(req, res) => {

    const {id} = req.params

    const {
        important = false,
        weight} = req.body

    if(isNaN(weight) || !weight){
        return res.status(404).json({
            error : 'El peso es obligatorio y tiene que ser un numero'
        })
    }
    const stock = await Stock.findById(id)

    if(!stock){
         return res.status(404).json({
            error : 'Stock inexistente'
        })
    }
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const finishDate = `${day}/${month}/${ year }`
  

    await Stock.findByIdAndUpdate(id,
        {   individualStock : [{ 
            important,
            date : finishDate,
            weight},...stock.individualStock]
        }
    )
    const updateStock = await Stock.findById(id)



    res.json(updateStock)
})
// taskRouter.patch('/discount/:id', async(req, res) => {
//     const {id} = req.params

//     const {
//         stateAcount = true,
//         cuenta
//     } = req.body

//     if(isNaN(cuenta)){
//         return res.status(404).json({
//             error : 'La cuenta tiene que ser un numero'
//         })
//     }

//     const date = new Date()
//     const day = date.getDate()
//     const month = date.getMonth() + 1
//     const year = date.getFullYear()
//     const finishDate = `${day}/${month}/${ year }`

//     const existClient = await Client.findById(id)

//     if(!existClient){
//         res.status(404).json({
//             error : 'Cliente inexistente'
//         })
//     }
//     await Client.findByIdAndUpdate(id,
//         {   tasks : [{ 
//             stateAcount,
//             date : finishDate,
//             cuenta},...existClient.tasks]
//         }
//     )
//     const updateClients = await Client.findById(id)

//     res.json(updateClients.tasks)
// })
// taskRouter.patch('/delete/:clientId/:i', async(req, res) => {
//     const { clientId, i} = req.params

//     const client = await Client.findById(clientId)

//     if(!client){
//         res.status(404).json({
//             error : 'Cliente inexistente'
//         })
//     }

//     client.tasks.splice( i, 1 )

//     console.log(client.tasks)

//     await client.save()

//     res.json(client.tasks)
 
// })
// taskRouter.patch('/edit/:clientId/:i', async(req, res) => {

//     const {clientId ,i} = req.params

//     const {
//         important = false,
//         state = false ,
//         stateAcount = false,
//         isPrinter = false,
//         isExtrusion = false,
//         material,
//         size,
//         colors,
//         heads,
//         weight,
//         meters,
//         cuenta,
//         tratado,
//         client
//     } = req.body
    
//     if(isNaN(cuenta)){
//         return res.status(404).json({
//             error : 'La cuenta tiene que ser un numero'
//         })
//     }
//     if( !client || !material || !size || !meters || !cuenta){
//         return res.status(404).json({
//             error : 'Algunos campos son obligatorios'
//         })
//     }

//     const existClient = await Client.findById(clientId)

//     if(!existClient){
//         res.status(404).json({
//             error : 'Cliente inexistente'
//         })
//     }
    
//     const date = new Date()
//     const day = date.getDate()
//     const month = date.getMonth() + 1
//     const year = date.getFullYear()
//     const finishDate = `${day}/${month}/${ year }`

//     const newArr = [...existClient.tasks]

//     newArr[i] = { 
//         important,
//         date : finishDate,
//         state,
//         stateAcount,
//         isPrinter,
//         isExtrusion,
//         isDiary : true,
//         material,
//         size,
//         colors,
//         heads,
//         weight,
//         cuenta,
//         tratado,
//         client,
//         meters 
//     }

//     try {
        
//     await Client.findByIdAndUpdate(clientId, {tasks : newArr})

//     } catch (error) {
//         res.status(404).json({
//             "error" : "La tarea no se pudo actualizar"
//         })
//         console.log(error)
//     }
//     const updateClients = await Client.findById(clientId)

//     res.json(updateClients.tasks)

// })
module.exports = individualStockRouter
