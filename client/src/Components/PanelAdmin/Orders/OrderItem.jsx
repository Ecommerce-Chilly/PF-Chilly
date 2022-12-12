import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletOrderItem, clearOrderMsg } from "../../../redux/actions/actions";
import Swal from "sweetalert2";

function OrderItem(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  function dispatchToDeleteOrderItem(id) {
    dispatch(deletOrderItem(id, token));
    dispatch(clearOrderMsg());
    setOpen(!open);
  }

  const confirmDeleteOrder = (id) => {
    Swal.fire({
      icon: "question",
      text: "Are you sure you want to delete this order?",
      confirmButtonText: "Yes",
      showDenyButton: "true",
      denyButtonText: "No",
      customClass: {
        container: "popup-container",
        popup: "popup",
        confirmButton: "confirm",
        denyButton: "deny",
        cancelButton: "cancel",
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatchToDeleteOrderItem(id);
      }
    });
  };

  return (
    <div
      className={`${
        open && "joder"
      } bg-white rounded-xl shadow-xl border  m-2  flex mx-auto justify-between h-40 w-1/2 mb-9`}
    >
      <Link
        to={`/panel+admin/orders/${props.id}`}
        className="my-auto ml-9 w-2/3"
      >
        <div className="">
          <p>
            <span className="font-bold">Id of purchase: </span>
            {props.id}
          </p>
          <p>
            <span className="font-bold">Date of purchase: </span>
            {props.createdAt}
          </p>
          <p>
            <span className="font-bold">User id: </span>
            {props.userId}
          </p>
          <p>
            <span className="font-bold">Item id: </span>
            {props.productId}
          </p>
          <p>
            <span className="font-bold">Quantity: </span>
            {props.quantity}
          </p>
        </div>
      </Link>
      <div className=" my-auto mr-9">
        <button
          onClick={() => confirmDeleteOrder(props.id)}
          className="text-main font-semibold rounded  right-5 top-1/3 px-3 py-1"
        >
          Delete Order
        </button>
      </div>
    </div>
  );
}

export default OrderItem;
