import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById, getProductById } from "../../../redux/actions/actions";
import ForbiddenAccess from "../ForbiddenAccess";

function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderItem, productDetail, userInfo, searchProductMsg, admin } =
    useSelector((state) => state);
  let token = localStorage.getItem("token");
  token = JSON.parse(token);

  useEffect(() => {
    dispatch(getOrderById(id, token));
    dispatch(getProductById(orderItem.productId));
  }, [dispatch, orderItem.productId]);

  return (
    <>
      {admin === true ? (
        <div>
          <Link to="/panel+admin/orders">Back to Orders</Link>
          {orderItem ? (
            <div>
              <div>Date of purchase: {orderItem.createdAt} </div>
              <div>Id of purchase: {orderItem.id}</div>
              <div>User id: {orderItem.userId}</div>
              <div>User e-mail: {userInfo.email} </div>
              <div>User name: {userInfo.name} </div>
              <div>Product id: {orderItem.productId}</div>
              <div>Quantity: {orderItem.quantity}</div>
            </div>
          ) : (
            <></>
          )}
          {productDetail.length > 0 ? (
            Object.keys(productDetail).length > 0 && (
              <div key={productDetail[0].id}>
                <p>Product:</p>
                <div>{productDetail[0].name} </div>
                <div>{productDetail[0].brand}</div>
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 max-w-lg max-h-quinientos w-full object-contain object-center rounded border border-gray-200"
                  src={productDetail[0].image.replace("SL75", "SL700")}
                />
              </div>
            )
          ) : !productDetail.length ? (
            <p>{searchProductMsg}</p>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <ForbiddenAccess />
      )}
    </>
  );
}

export default OrderDetail;
