import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../../redux/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const produDetail = useSelector((state) => state.productDetail);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/panel+admin/products">
        <button>Back to Page Admin - Product</button>
      </Link>
      {
        Object.keys(produDetail).length > 0 && (
          <div key={produDetail.id}>
            <img src={produDetail.image} alt={produDetail.name} />
            <h1> {produDetail.name}</h1>
            <h2> Price:{produDetail.price} </h2>
            <h2> Brand: {produDetail.brand}</h2>
            <h3> Mode: {produDetail.model}</h3>
            <h2> Category: {produDetail.categoryName}</h2>
            <h2> Stock: {produDetail.inventory.quantity}</h2>
            <Link to={`/panel+admin/change/product/${produDetail.id}`}>
              <button>Want to change product? Click here!</button>
            </Link>
          </div>
        )
      }
    </div>
  );
}

export default ProductDetail;
