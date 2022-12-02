const { Router } = require("express");
const postUser = require("../controllers/user/postUser")
const { getUser } = require("../controllers/user/getUser")
const { deleteUser } = require("../controllers/user/deleteUser")
const { userAdmin } = require('../controllers/user/userAdmin')
const { checkJwt, checkScopes } = require('../middleware/oAuth')
const userRoute = Router();
userRoute.get("/", checkJwt, async (req, res) => {
  try {
    let { id, email } = req.query;
    if (id) {
      id = Number(id);
      if (isNaN(id)) return res.status(406).send({ error: "Not Acceptable, id is not a number" })
      const user = await getUser(id, email)
      return res.status(200).send(user)
    }
    const users = await getUser()
    return res.send(users)
  } catch (error) {
    return res.status(404).send({ error: error })
  }
});

userRoute.delete('/:id', checkJwt, async (req, res) => {
  try {
    const userDelete = await deleteUser(req.params.id);
    res.status(201).send(userDelete)
  } catch (error) {
    res.status(404).send({ error: error })
  }
})

userRoute.post('/', checkJwt, async (req, res) => {
  try {
    const userCreate = await postUser(req.body);
    res.status(201).send(userCreate);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});
userRoute.put('/admin', checkJwt, checkScopes, async (req, res) => {
  try {
    const msg = await userAdmin(req.query)
    res.send(msg)
  } catch (error) {
    res.status(400).send(false)
  }
})

userRoute.post("/tio", async (req, res) => {
  try {
    const user = await getUser(req.body);
    if (!user.length) {
      return res.status(404).send({ error: "User not exist" });
    }
    return res.send(user);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

module.exports = userRoute;