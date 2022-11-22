const { Router } = require("express");
const postUser = require("../controllers/postUser")
const userRoute = Router();




userRoute.post('/', async (req, res) => {
    try {
        const userCreate = await postUser(req.body);
        res.status(201).send(userCreate)
    } catch (error) {
        res.status(404).send(error)
    }
})



module.exports = { userRoute }