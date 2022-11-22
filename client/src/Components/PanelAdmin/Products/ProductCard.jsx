import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { deleteProdut } from '../../../redux/actions/actions.js';
import { useDispatch } from 'react-redux';
=======
>>>>>>> 7af530864c2903624bad2f1b6ab40a72d1b9e96d

function ProductCard(props) {
  const dispatch = useDispatch();

  function dispatchToDeleteProduct(id) {
    dispatch(deleteProdut(id));
  }

  return (
<<<<<<< HEAD
    <div>
      <button
        onClick={() => {
          dispatchToDeleteProduct(props.id);
        }}
      >
        Want to delete? Click here!
      </button>
=======
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <h1 className="text-3xl font-bold text-red-300">Hola</h1>
>>>>>>> 7af530864c2903624bad2f1b6ab40a72d1b9e96d
      <Link to={`/panel+admin/products/${props.id}`}>
        <div>
          <div>
            <h2>{props.name}</h2>
            <img src={props.image} alt={props.name} />
            <p>Brand: {props.brand}</p>
            <p>Price: {props.price}</p>
            <p>Category:{props.categoryName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
