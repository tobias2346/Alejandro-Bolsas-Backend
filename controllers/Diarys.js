const diaryRouter = require('express').Router()
const Diary = require('../models/Diary')
const { validarJWT } = require('../Middlewares/validar-jwt')

diaryRouter.get('/', async(req, res) => {

    const diary = await Diary.find({})

    if(!diary){
        return res.status(404).json({
            error : 'no hay extrucion'
        })
    }
    res.json(diary)
})
diaryRouter.post('/' ,[validarJWT], async (req, res) => {
    
    const {
        important = false,
        text,
    } = req.body
   
    if(!text){
        return res.status(404).json({
            error : 'Algunos campos son obligatorios'
        })
    }
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const finishDate = `${day}/${month}/${ year }`

    const newDiary = new Diary({ 
        important,
        text,
        date : finishDate
    })


    try {
        await newDiary.save()

        const allDiarys = await Diary.find({})

        res.json(allDiarys)

    } catch (error) {
        console.log(error)
    }
})
diaryRouter.delete('/:id', async(req, res) => {

    const { id } = req.params

    const diary = await Diary.findByIdAndDelete(id)

    if(!diary){
        return res.status(404).json({
            error : 'No existe esa tarea de extrusion'
        })
    }

    const allDiarys = await Diary.find({})

    res.json(allDiarys)
})

module.exports = diaryRouter
