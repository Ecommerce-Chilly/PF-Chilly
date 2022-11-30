const { Router } = require("express");
const postUser = require("../controllers/user/postUser")
const { getUser, getAllUsers } = require("../controllers/user/getUser")
const { deleteUser } = require("../controllers/user/deleteUser")
const userRoute = Router();


userRoute.delete('/:id', async (req, res) => {
  try {
    const userDelete = await deleteUser(req.params.id);
    res.status(201).send(userDelete)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
})

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
    let { id } = req.params;
    id = Number(id);
    if (isNaN(id)) return res.status(406).send({ error: "Not Acceptable, id is not a number" })
    const user = await getUser(id)
    return res.status(200).send(user)
  } catch (error) {
    return res.status(404).send({ error: error.message })
  }
})

userRoute.get('/', async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).send(users)

  } catch (error) {
    res.status(404).send({ error: error.message })
  }
})


module.exports = userRoute 
