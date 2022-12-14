const { Article } = require('../../db');

const getArticle = async () => {
  const dataArticle = await Article.findAll();
  if (dataArticle.length <= 0) {
    throw Error('Empty article data');
  } else {
    return dataArticle;
  }
};

module.exports = getArticle;
