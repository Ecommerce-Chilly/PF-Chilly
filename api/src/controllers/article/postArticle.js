const { Article } = require('../../db');

const postArticle = async ({ title, image, description }) => {
  if (!title || !image || !description) {
    throw Error('Sending incomplete information!');
  } else {
    const article = await Article.create({
      title,
      image,
      description,
    });
    return article;
  }
};

module.exports = postArticle;
