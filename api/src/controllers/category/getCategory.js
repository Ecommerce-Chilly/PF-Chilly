const dataCategory = require('../../data/data-category.json');
const { Category } = require('../../db.js')

const getCategory = async ({ transaction } = {}) => {

  const create = dataCategory.map(type => {
    return {
      name: type.name,
      description: type.description
    }
  })
  await Category.bulkCreate(create, {
    ignoreDuplicates: true,
    transaction,
  });
}

module.exports = { getCategory };
