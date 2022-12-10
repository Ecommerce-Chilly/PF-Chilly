import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletOrderItem } from "../../../redux/actions/actions";

function OrderItem(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  function dispatchToDeleteOrderItem(id) {
    dispatch(deletOrderItem(id, token));
    setOpen(!open);
  }
  return (
    <div className={`${open && "joder"}`}>
      <button onClick={() => dispatchToDeleteOrderItem(props.id)}>
        Delete Order
      </button>
      <Link to={`/panel+admin/orders/${props.id}`}>
        <div>
          <p>Date of purchase: {props.createdAt} </p>
          <p>Id of purchase: {props.id} </p>
          <p>User id: {props.userId}</p>
          <p>Item id: {props.productId}</p>
          <p>Quantity: {props.quantity}</p>
        </div>
      </Link>
    </div>
  );
}

export default OrderItem;
