import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById, getProductById } from '../../../redux/actions/actions';
import ForbiddenAccess from '../ForbiddenAccess';
import { Link } from 'react-router-dom';
import Loader from '../../PI Components/Loader/Loader';

function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderItem, productDetail, userInfo, searchProductMsg, admin } =
    useSelector((state) => state);
  let token = localStorage.getItem('token');
  token = JSON.parse(token);

  useEffect(() => {
    dispatch(getOrderById(id, token));
    dispatch(getProductById(orderItem.productId));
  }, [dispatch, orderItem.productId]);

  return (
    <div>
      {admin === true ? (
        <div className="mb-20">
          <div className="mb-10 ">
            <h1 className="text-slate-800 text-3xl font-display font-semibold mt-12 ml-60 mb-9">
              Order detail:
            </h1>
            <Link
              to="/panel+admin/orders"
              className="font-medium text-main ml-60 pb-9 top-44 z-10 border-solid  "
            >
              Back to Orders history
            </Link>
          </div>

          {orderItem ? (
            <div className="bg-white rounded-xl shadow-xl border  m-2  p-4 mx-auto  h-60 w-1/2 mb-9">
              <div className="ml-6">
                <h2 className="text-slate-800  font-display font-semibold mb-2 ">
                  Order info:
                </h2>
                <div>Date of purchase: {orderItem.createdAt} </div>
                <div>Id of purchase: {orderItem.id}</div>
                <div>User id: {orderItem.userId}</div>
                <div>User name: {userInfo.name} </div>
                <div>User e-mail: {userInfo.email} </div>

                <div>Product id: {orderItem.productId}</div>
                <div>Quantity: {orderItem.quantity}</div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {productDetail.length > 0 ? (
            Object.keys(productDetail).length > 0 && (
              <div
                key={productDetail[0].id}
                className="bg-white rounded-xl shadow-xl border  m-2  flex mx-auto justify-between h-60 w-1/2 mb-9 "
              >
                <div className="flex w-full ml-6 justify-between">
                  <div className="  w-2/3 p-4">
                    <h2 className="text-slate-800  font-display font-semibold mb-2 ">
                      Product:
                    </h2>
                    <p className="mb-2">{productDetail[0].name} </p>
                    <p className="mb-2">
                      <span className="font-semibold">Brand: </span>
                      {productDetail[0].brand}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Unit price: </span>$
                      {productDetail[0].price}
                    </p>
                    <p>
                      <span className="font-semibold">Total price: </span>$
                      {productDetail[0].price * orderItem.quantity}
                    </p>
                  </div>
                  <div className=" w-1/3 h-44 flex">
                    <img
                      alt="ecommerce"
                      className="h-40 mx-auto my-auto"
                      src={productDetail[0].image.replace('SL75', 'SL700')}
                    />
                  </div>
                </div>
              </div>
            )
          ) : !productDetail.length ? (
            <Loader />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <ForbiddenAccess />
      )}
    </div>
  );
}

export default OrderDetail;
