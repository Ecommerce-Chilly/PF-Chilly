import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../../redux/actions/actions';
import OrderItem from './OrderItem';
import { Link } from 'react-router-dom';
import ForbiddenAccess from '../ForbiddenAccess';

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.allOrders);
  const admin = useSelector((state) => state.admin);
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(getAllOrders(JSON.parse(token)));
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {admin === true ? (
        <div>
          <div className="mb-10 ">
            <h1 className="text-slate-800 text-3xl font-display font-semibold mt-12 ml-60 mb-9">
              Orders history:
            </h1>
            <Link
              to="/panel+admin"
              className="font-medium text-main ml-60 pb-9 top-44 z-10 border-solid  "
            >
              Back to Panel Admin
            </Link>
          </div>
          {orders.length > 0 ? (
            orders?.map((e) => <OrderItem key={e.id} {...e} />)
          ) : (
            <p>No orders buyed</p>
          )}
        </div>
      ) : (
        <ForbiddenAccess />
      )}
    </div>
  );
}

export default Orders;
