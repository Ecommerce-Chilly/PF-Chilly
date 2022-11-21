import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
  return (
    <div>
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
