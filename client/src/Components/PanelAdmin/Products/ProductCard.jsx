import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard(props) {
  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <h1 className="text-3xl font-bold text-red-300">Hola</h1>
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
