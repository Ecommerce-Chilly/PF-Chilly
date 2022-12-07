const { Router } = require("express");
const postUser = require("../controllers/user/postUser")
const { getUser, getAllUsers } = require("../controllers/user/getUser")
const { deleteUser } = require("../controllers/user/deleteUser")
const { userAdmin } = require('../controllers/user/userAdmin')
const { checkJwt, checkScopes } = require('../middleware/oAuth')
// import { addCartItem } from "../controllers/cart/addCartItem";
const { addShoppingSession } = require("../controllers/shopping/addShoppingSession")
const userRoute = Router();

userRoute.get("/", checkJwt, async (req, res) => {
  try {
    let { email } = req.query;
    const users = await getUser(email)
    return res.send(users)
  } catch (error) {
    return res.status(404).send({ error: error })
  }
});
userRoute.post('/shop', async (req, res) => {
  try {
    const { userId } = req.body
    const shop = addShoppingSession(userId)
    res.send(shop)
  } catch (error) {
    return res.status(404).send({ error: error })
  }
})
userRoute.get('/all', checkJwt, checkScopes, async (req, res) => {
  try {
    const users = await getAllUsers()
    return res.send(users)
  } catch (error) {
    return res.status(404).send({ error: error })
  }
})

userRoute.delete('/:id', checkJwt, async (req, res) => {
  try {
    const userDelete = await deleteUser(req.params.id);
    res.status(201).send(userDelete)
  } catch (error) {
    res.status(404).send({ error: error })
  }
})

userRoute.post('/', async (req, res) => {
  try {
    const { email } = req.body
    console.log(email);
    const userCreate = await postUser(req.body);
    res.status(201).send(userCreate);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

userRoute.get('/admin', checkJwt, checkScopes, async (req, res) => {
  try {
    const msg = await userAdmin(req.query)
    res.send(msg)
  } catch (error) {
    res.status(400).send(error)
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