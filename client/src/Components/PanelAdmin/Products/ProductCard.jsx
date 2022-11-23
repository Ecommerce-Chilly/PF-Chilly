import React from "react";
import { Link } from "react-router-dom";
import { deleteProdut } from "../../../redux/actions/actions.js";
import { useDispatch } from "react-redux";

function ProductCard(props) {
  const dispatch = useDispatch();

  function dispatchToDeleteProduct(id) {
    dispatch(deleteProdut(id));
  }

  return (
    <div className="container mx-auto bg-green-200 rounded-xl shadow border p-8 m-10">
      <button
        onClick={() => {
          dispatchToDeleteProduct(props.id);
        }}
      >
        Want to delete? Click here!
      </button>
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
