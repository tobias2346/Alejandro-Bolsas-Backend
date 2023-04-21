const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

userRouter.get('/' , async(req, res) => {
    const users = await User.find({})
    res.json(users)
})

userRouter.get('/:id' , (req, res) => {

    const {id} = req.params

    User.findById(id).then( user => {
        res.json(user)
    }).catch(err => {
        console.log(err)
    })
})

userRouter.post('/' , async (req, res) => {

    const { username, name, password } = req.body

    if( !username || !name || !password){
        return res.status(401).json({
            error: 'El username, el name o la password son obligatorias'   
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const saveUser = await newUser.save()

    res.json(saveUser)
})

module.exports = userRouter