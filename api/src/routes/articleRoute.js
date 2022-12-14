const { Router } = require('express');
const articleRoute = Router();
const postArticle = require('../controllers/article/postArticle');
const getArticle = require('../controllers/article/getArticle');
const putArticle = require('../controllers/article/putArticle');
// const { checkJwt, checkScopes } = require('../middleware/oAuth');
// checkJwt, checkScopes

articleRoute.post('/', async (req, res) => {
  try {
    const articleCreate = await postArticle(req.body);
    res.status(201).send(articleCreate);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

articleRoute.get('/', async (req, res) => {
  try {
    const articleAll = await getArticle();
    res.status(200).send(articleAll);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

articleRoute.put('/', async (req, res) => {
  try {
    const articleUpdate = await putArticle(req.body);
    res.status(201).send(articleUpdate);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = articleRoute;
