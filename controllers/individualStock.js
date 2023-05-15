const individualStockRouter = require('express').Router()
const Stock = require('../models/Stock')

individualStockRouter.get('/:id' , async(req, res) => {
    const {id} = req.params

    const stock = await Stock.findById(id)


    if( !stock ){
        res.status(404).json({
            error : 'Cliente inexistente'
        })
    }

    res.json(stock)
})
individualStockRouter.patch('/discountF/:id', async(req, res) => {

    const {id} = req.params

    const { 
        important = false, 
        stateDiscount = false
     } = req.body

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
            stateDiscount
            },...stock.individualStock]
        }
    )
    const updateStock = await Stock.findById(id)

    res.json(updateStock)
})
individualStockRouter.patch('/discountT/:id', async(req, res) => {

    const {id} = req.params

    const { 
        important = false, 
        stateDiscount = true,
        aditionalText
     } = req.body

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
            stateDiscount,
            aditionalText
            },...stock.individualStock]
        }
    )
    const updateStock = await Stock.findById(id)

    res.json(updateStock)
})
individualStockRouter.patch('/delete/:i/:id', async(req, res) => {

    const {id, i} = req.params

    const stock = await Stock.findById(id)

    if(!stock){
         return res.status(404).json({
            error : 'Stock inexistente'
        })
    }

    stock.individualStock.splice( i , 1)

    await stock.save()

    res.json(stock)
})
module.exports = individualStockRouter
