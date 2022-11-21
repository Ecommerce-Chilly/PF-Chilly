const { User } = require("../db")


const getUser = async (req, res) => {

    try {
        let resp = await User.findAll();
        res.status(200).send(resp);
    } catch (error) {
        console.log(error)
    }

}

const postUser = async (req, res) => {
    try {
        const body = req.body
        let results = await User.create({})
        res.status(201).send({
            msg: "user created", results
        })
    } catch (error) {
        console.log(error)
    }

}

const putUser = async (req, res) => {

    try {
        const body = req.body
        const params = params.id

        let results = await User.update(
            body
        )


    } catch (error) {
        console.log(error)
    }

}

const deleteUser = ((req, res) => {

    res.json(
        {
            msg: "this is a delete"
        }
    )

})


module.exports = { getUser, postUser, putUser, deleteUser }