const validate = (newProduct) => {
  let errors = {};
  if (!newProduct.name) {
    errors.name = 'Please provide a name';
  } else if (!/([A-Z])\w+/.test(newProduct.name)) {
    errors.name =
      'The first letter must be capital and have more than one letter';
  }
  if (!newProduct.price) {
    errors.price = 'Please provide a price';
  } else if (newProduct.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }
  if (!newProduct.brand) {
    errors.brand = 'Please provide a brand';
  }
  if (!newProduct.model) {
    errors.model = 'Please provide a a model';
  }
  if (!newProduct.quantity) {
    errors.quantity = 'Please provide a quantity';
  } else if (newProduct.quantity < 0) {
    errors.quantity = 'Quantity must be greater than 0';
  }
  if (!newProduct.category) {
    errors.category = 'Please provide a category';
  }
  if (!newProduct.discount) {
    errors.discount = 'Please provide a discount';
  }
  return errors;
};

module.exports = { validate };
