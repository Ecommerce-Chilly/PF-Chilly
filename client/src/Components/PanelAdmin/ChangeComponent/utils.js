const validate = (newProduct) => {
  let errors = {};
  if (!newProduct.name) {
    errors.name = "Product requires a name";
  } else if (!/([A-Z])\w+/.test(newProduct.name)) {
    errors.name =
      "The first letter must be capital and must have more than one letter";
  }
  if (!newProduct.price) {
    errors.price = "Product requires a price";
  } else if (newProduct.price < 0) {
    errors.price = "Price must be more than 0";
  }
  if (!newProduct.brand) {
    errors.brand = "Products require a brand";
  }
  if (!newProduct.model) {
    errors.model = "Products requires a model";
  }
  if (!newProduct.quantity) {
    errors.quantity = "Product requires a quantity";
  } else if (newProduct.quantity < 0) {
    errors.quantity = "Require must be more than 0";
  }
  if (!newProduct.category) {
    errors.category = "Requires an category";
  }
  if (!newProduct.discount) {
    errors.discount = "Requires an discount";
  }
  return errors;
};


module.exports = { validate };
