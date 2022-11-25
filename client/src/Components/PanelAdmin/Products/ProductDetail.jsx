import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/actions/actions.js';
import { useDispatch, useSelector } from 'react-redux';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const produDetail = useSelector((state) => state.productDetail);
  const failMsg = useSelector((state) => state.searchProductMsg);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/panel+admin/products">
        <button>Back to Page Admin - Product</button>
      </Link>
      {produDetail.length > 0 ? (
        Object.keys(produDetail).length > 0 && (
          <div key={produDetail[0].id} className="flex row">
            <div>
              <img src={produDetail[0].image} alt={produDetail[0].name} />
            </div>
            <div>
              <p> {produDetail[0].name}</p>
              <p> Price:{produDetail[0].price} </p>
              <p> Brand: {produDetail[0].brand}</p>
              <p> Model: {produDetail[0].model}</p>
              <p> Category: {produDetail[0].categoryName}</p>
              <p> Stock: {produDetail[0].inventory.quantity}</p>
            </div>
            <Link to={`/panel+admin/change/product/${produDetail[0].id}`}>
              <button>Want to change product? Click here!</button>
            </Link>
          </div>
        )
      ) : !produDetail.length ? (
        <p>{failMsg}</p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDetail;
