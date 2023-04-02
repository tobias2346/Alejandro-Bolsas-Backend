module.exports = (err, req, res) => {
    console.error(err)
    res.status(400).send({ error: 'id used is malformed'})
}