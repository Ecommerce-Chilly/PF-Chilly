import React, { useState } from "react";
import {
  restoreProduct,
  clearDeleted,
} from "../../../redux/actions/actions.js";
import { useDispatch } from "react-redux";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ProductCard(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  function dispatchToRestore(id) {
    dispatch(restoreProduct(id, token));
    dispatch(clearDeleted(id));
    setOpen(!open);
  }
  const confirmRestoreProd = (id) => {
    Swal.fire({
      icon: "question",
      text: "Are you sure you want to restore this product?",
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
        dispatchToRestore(id);
      }
    });
  };
  return (
    <div
      className={`w-72 h-96 mb-11 bg-white rounded-xl shadow-xl border  m-2 relative flex flex-col justify-between ${
        open && "joder"
      }`}
    >
      <div className="h-96 flex flex-col px-5 pt-5">
        <div className="text-slate-800">
          <h2 className="font-semibold tracking-wide     text-slate-700 font-display">
            {props.name.length > 40
              ? `${props.name.slice(0, 50)}...`
              : props.name}
          </h2>

          <img
            className="m-auto h-40"
            src={props.image.replace("SL75", "SL500")}
            alt={props.name}
          />
          <p>Brand: {props.brand}</p>
          <p>Price: {props.price}</p>
          <p>Category: {props.categoryName}</p>
        </div>
      </div>
      <div className="flex justify-evenly mb-2">
        <button
          className="bg-main text-white font-semibold rounded px-3 h-9"
          onClick={() => {
            confirmRestoreProd(props.id);
          }}
        >
          Restore
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
