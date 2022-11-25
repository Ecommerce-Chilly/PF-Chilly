import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../redux/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";

function ProductDetailToStore() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const produDetail = useSelector((state) => state.productDetail);
  const failMsg = useSelector((state) => state.searchProductMsg);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <div>
      {produDetail.length > 0 ? (
        Object.keys(produDetail).length > 0 && (
          <>
            <div key={produDetail[0].id} className="flex row">
              <div>
                <img src={produDetail[0].image} alt={produDetail[0].name} />
              </div>
              <div>
                <h1> {produDetail[0].name}</h1>
                <h2> Price:{produDetail[0].price} </h2>
                <h2> Brand: {produDetail[0].brand}</h2>
                <h3> Model: {produDetail[0].model}</h3>
                <h2> Category: {produDetail[0].categoryName}</h2>
                <h2> Stock: {produDetail[0].inventory.quantity}</h2>
              </div>
            </div>
          </>
        )
      ) : !produDetail.length ? (
        <p>{failMsg}</p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDetailToStore;
