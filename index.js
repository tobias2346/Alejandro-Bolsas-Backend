require('./mongoose')
const express = require ('express')
const cors = require('cors')
const app = express()
const { finalError, logger } = require('./Middlewares/logger')
const userRouter = require('./controllers/Users')
const loginRouter = require('./controllers/login')
const clientRouter = require('./controllers/Clients')
const taskRouter = require('./controllers/Tasks')
const printerRouter = require('./controllers/Printers')
const extrusionRouter = require('./controllers/Extrusions')
const cutRouter = require('./controllers/Cuts')
const diaryRouter = require('./controllers/Diarys')
app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/api/task', taskRouter)

app.use('/api/users', userRouter)

app.use('/api/login' , loginRouter)

app.use('/api/client', clientRouter)

app.use('/api/printer', printerRouter)

app.use('/api/extrusion', extrusionRouter)

app.use('/api/cut', cutRouter)

app.use('/api/diary', diaryRouter)

app.use(finalError)

app.listen(3001, () => {console.log('3001')})