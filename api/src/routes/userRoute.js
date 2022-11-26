const { Router } = require("express");
<<<<<<< HEAD
const postUser = require("../controllers/user/postUser")
const { getUser, getAllUsers } = require("../controllers/user/getUser")
=======
const postUser = require("../controllers/postUser")
const { getUser, getAllUsers } = require("../controllers/getUser")
>>>>>>> 44fe9fa9264024360b95c6cda0f8753ee688b9e0
const userRoute = Router();




userRoute.post('/', async (req, res) => {
  try {
    const userCreate = await postUser(req.body);
    res.status(201).send(userCreate)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
})
<<<<<<< HEAD

=======
>>>>>>> 44fe9fa9264024360b95c6cda0f8753ee688b9e0
userRoute.get('/:id', async (req, res) => {
  try {
    const user = await getUser(req.params.id)
    res.status(200).send(user)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
})
<<<<<<< HEAD

userRoute.get('/', async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).send(users)

  } catch (error) {
    res.status(404).send({ error: error.message })
  }
})


module.exports = userRoute 
=======
module.exports = userRoute;
>>>>>>> 44fe9fa9264024360b95c6cda0f8753ee688b9e0
