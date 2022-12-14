const { Article } = require('../../db');

const putArticle = async ({ id, title, image, description }) => {
  const update = await Article.findByPk(id);
  if (!update) {
    throw Error(`The article with id: ${id} does not exist`);
  } else {
    update.title = title;
    update.image = image;
    update.description = description;
    await update.save();
    return update;
  }
};

module.exports = putArticle;
