const logger = (req, res, next) => {
    console.log(req.path)
    console.log('Logger')
    next()
}

const finalError = (req, res) => {
    console.log(req.path)
    res.status(404).json({
        error: 'not found'
    })
}

module.exports = {
    logger,
    finalError
}