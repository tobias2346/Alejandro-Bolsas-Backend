const weightStockRouter = require('express').Router()
const Stock = require('../models/Stock')

weightStockRouter.patch('/:i/:id', async(req, res) => {

    const {id, i} = req.params

    const {
        weight} = req.body
        console.log(weight)

    const stock = await Stock.findById(id)

    if(isNaN(weight)){
        return res.status(404).json({
           error : 'El peso tiene que ser un numero'
       })
   }
    if(!stock){
         return res.status(404).json({
            error : 'Stock inexistente'
        })
    }

    const peso = Number(weight)

    const newStock = [...stock.individualStock];
    newStock[i].weightStock.push(peso)
    
    await Stock.findByIdAndUpdate(id,
        { individualStock : newStock}
    )
    const updateStock = await Stock.findById(id)

    res.json(updateStock)
})

module.exports = weightStockRouter