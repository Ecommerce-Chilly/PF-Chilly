import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//import * as actions from "../../../redux/actions/actions";
import './CreateComponent.css';

export function validate(newProduct) {
  let errors = {};
  if (!newProduct.name) {
    errors.name = 'Product requires a name';
  } else if (!/([A-Z])\w+/.test(newProduct.name)) {
    errors.name =
      'The first letter must be capital and must have more than one letter';
  }
  if (!newProduct.price) {
    errors.price = 'Product requires a price';
  } else if (newProduct.price < 0) {
    errors.price = 'Price must be more than 0';
  }
  if (Object.entries(newProduct.details).length === 0) {
    errors.details = 'Product requires an detail';
  }
  if (newProduct.inInventary < 0) {
    errors.inInventary = 'Require must be more than 0';
  }
  if (!newProduct.category) {
    errors.category = 'Requires an category';
  }
}

function CreateComponent() {
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.createMsg);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    image: '',
    inInventary: 0,
    category: '',
    details: [],
    discount: 0,
  });

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...newProduct,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleDetailChange = (e) => {
    setNewProduct({
      ...newProduct,
      details: [{ ...newProduct.details, [e.target.name]: e.target.value }],
    });
    setErrors(
      validate({
        ...newProduct,
        details: [{ ...newProduct.details, [e.target.name]: e.target.value }],
      })
    );
  };

  function dispatchDataToCreate(newProduct) {
    dispatch(actions.createProduct(newProduct));
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatchDataToCreate(newProduct);
          setTimeout(() => history.push('/home'), 3000);
        }}
      >
        <h1>Create Product</h1>
        <label>Name of producto:</label>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          /* onChange={handleChange} */
          placeholder="Write the name here..."
        ></input>
        {errors.name && <p>{errors.name}</p>}
        <label>Image Url: Product</label>
        <input
          type="text"
          name="image"
          value={newProduct.image}
          /* onChange={handleChange} */
          placeholder="Image Product at here"
        ></input>
        <label>Price of product</label>
        <input
          type="number"
          name="price"
          value={newProduct.price}
          /* onChange={handleChange} */
          placeholder="Price at here"
        ></input>
        {errors.price && <p>{errors.price}</p>}
        <label>Discount:</label>
        <input
          type="number"
          name="discount"
          value={newProduct.discount}
          /* onChange={handleChange} */
          placeholder="Discount at here :D"
        ></input>
        <label>Item in inventary</label>
        <input
          type="number"
          name="inInventary"
          value={newProduct.inInventary}
          /* onChange={handleChange} */
          placeholder="Quantity of product"
        ></input>
        {errors.inInventary && <p>{errors.inInventary}</p>}
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={newProduct.category}
          /* onChange={handleChange} */
          placeholder="Category at here"
        ></input>
        {errors.category && <p>{errors.category}</p>}
        <label>Details of Product</label>
      </form>
    </>
  );
}

export default CreateComponent;
