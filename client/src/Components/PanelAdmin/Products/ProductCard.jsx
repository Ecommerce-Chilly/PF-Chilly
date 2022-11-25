import {
  deleteProdut,
  restoreProduct,
} from "../../../redux/actions/actions.js";
import { useDispatch } from "react-redux";
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard(props) {
  const dispatch = useDispatch();

  function dispatchToDeleteProduct(id) {
    dispatch(deleteProdut(id));
  }

  function dispatchToRestore(id) {
    dispatch(restoreProduct(id));
  }

  return (
    <div className="container mx-auto bg-green-200 rounded-xl shadow border p-8 m-10">
      <>
        <div className="flex justify-between">
          <button
            onClick={() => {
              dispatchToDeleteProduct(props.id);
            }}
          >
            Want to delete? Click here!
          </button>
          <button
            onClick={() => {
              dispatchToRestore(props.id);
            }}
          >
            RESTORE_PRODUCT
          </button>
        </div>
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
      </>
    </div>
  );
}

export default ProductCard;
