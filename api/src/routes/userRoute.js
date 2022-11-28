const { Router } = require("express");
const postUser = require("../controllers/user/postUser");
const { getUser, getAllUsers } = require("../controllers/user/getUser");
const userRoute = Router();

userRoute.post("/", async (req, res) => {
  try {
    const userCreate = await postUser(req.body);
    res.status(201).send(userCreate);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

userRoute.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

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
