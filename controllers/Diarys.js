const diaryRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Diary = require('../models/Diary')

diaryRouter.get('/', async(req, res) => {

    const diary = await Diary.find({})

    if(!diary){
        return res.status(404).json({
            error : 'no hay extrucion'
        })
    }
    res.json(diary)
})
diaryRouter.post('/' , async (req, res) => {
    
    const {
        important = false,
        text,
    } = req.body

    if(!text){
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
