const express = require ('express')
const cors = require('cors')
const app = express()
let {clients} = require('./clients')
const { finalError, logger } = require('./Middlewares/logger')

app.use(cors())
app.use(express.json())


app.use(logger)

app.get('/', (req, res) => {
    res.send('<h1>Hola mundo</h1>')
})

app.get('/clients', (req, res) => {
    res.send(clients)
})

app.get('/api/client/:id' , (req, res) => {
    const id = Number(req.params.id)
    const client = clients.find( client => client.id === id)
    res.json(client)
})

app.delete('/api/client/:id' , (req, res) => {
    const id = Number(req.params.id)
    clients = clients.filter(client => client.id !== id)
    res.status(204).end()
})

app.post('/api/clientPost' , (req, res) => {
    const client = req.body
    const ids = clients.map( client => client.id )
    const maxId = Math.max(...ids)
    const newClient = {
        id: maxId + 1,
        content : client.content,
        important : client.important || false,
        date : new Date().toISOString()
    }

    clients =  [...clients, newClient]
    res.json(newClient)
})

app.use(finalError)


app.listen(3001, () => {console.log('3001')})