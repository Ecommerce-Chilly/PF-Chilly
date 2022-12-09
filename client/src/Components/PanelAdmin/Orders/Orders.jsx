import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../redux/actions/actions";
import OrderItem from "./OrderItem";
import { Link } from "react-router-dom";
import ForbiddenAccess from "../ForbiddenAccess";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.allOrders);
  const admin = useSelector((state) => state.admin);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getAllOrders(JSON.parse(token)));
  }, [dispatch]);

  return (
    <>
      {admin === true ? (
        <div>
          <div>
            <Link to="/panel+admin">Back to Panel Admin</Link>
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
    </>
  );
}

export default Orders;
