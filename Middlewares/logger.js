const logger = (req, res, next) => {
    console.log(req.path)
    console.log('Peticion... Corriendo')
    next()
}

const finalError = (req, res) => {
    console.log(req.path)
    res.status(404).json({
        error: 'Url no encontrada'
    })
}

module.exports = {
    logger,
    finalError
}