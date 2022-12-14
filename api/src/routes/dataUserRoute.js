const { Router } = require('express');
const dataUserRoute = Router();
const postDataUser = require('../controllers/datauser/postDataUser');
const putDataUser = require('../controllers/datauser/putDataUser');
const getDataUser = require('../controllers/datauser/getDataUser');

dataUserRoute.get('/', async (req, res) => {
  try {
    const dataUserAll = await getDataUser();
    res.status(200).send(dataUserAll);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

dataUserRoute.post('/', async (req, res) => {
  try {
    const dataUser = await postDataUser(req.body);
    res.status(201).send(dataUser);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

dataUserRoute.put('/', async (req, res) => {
  try {
    const dataUserUpdate = await putDataUser(req.body);
    res.status(201).send(dataUserUpdate);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = dataUserRoute;
