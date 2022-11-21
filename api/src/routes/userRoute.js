const { Router } = require("express");
const { getUser, postUser, putUser, deleteUser } = require("../controllers/user")
const userRoute = Router()




userRoute.get('/', getUser)
userRoute.post('/', postUser)
userRoute.put('/', putUser)
userRoute.delete('/', deleteUser)


module.exports = { userRoute }