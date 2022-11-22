const { Router } = require("express");
const postUser = require("../controllers/postUser")
const getUser = require("../controllers/getUser")
const userRoute = Router();




userRoute.post('/', async (req, res) => {
    try {
        const userCreate = await postUser(req.body);
        res.status(201).send(userCreate)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

userRoute.get('/:id', async (req, res) => {
    try {
        const user = await getUser(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})


module.exports = { userRoute }