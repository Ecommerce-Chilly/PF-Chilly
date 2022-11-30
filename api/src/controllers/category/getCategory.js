const dataCategory = require('../../data/data-category.json');
const { Category } = require('../../db.js')

const getCategory = async () => {

  const create = dataCategory.map(type => {
    return {
      name: type.name,
      description: type.description
    }
  })
  await Category.bulkCreate(create);
}

module.exports = { getCategory };