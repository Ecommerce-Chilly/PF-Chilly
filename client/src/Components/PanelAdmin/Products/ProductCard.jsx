import React, { useState } from "react";
import {
  deleteProdut,
  restoreProduct,
} from "../../../redux/actions/actions.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ProductCard.css";
import Swal from "sweetalert2";

function ProductCard(props) {
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  const [open, setOpen] = useState(false);

  function dispatchToDeleteProduct(id) {
    dispatch(deleteProdut(id, token));
    setOpen(!open);
  }

  const confirmDeleteProd = (id) => {
    Swal.fire({
      icon: "question",
      text: "Are you sure you want to delete this product?",
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
        dispatchToDeleteProduct(id);
      }
    });
  };

  return (
    <div
      className={`w-72 h-96 mb-11 bg-white rounded-xl shadow-xl border  m-2 relative flex flex-col justify-between ${
        open && "joder"
      }`}
    >
      {props.categoryName ? (
        <>
          <Link
            to={`/panel+admin/products/${props.id}`}
            className="h-96 flex flex-col px-5 pt-5"
          >
            <div>
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
          </Link>
          <div className="flex justify-evenly mb-6">
            <button
              className="text-main font-semibold rounded px-3 py-1"
              onClick={() => {
                confirmDeleteProd(props.id);
              }}
            >
              Delete Product
            </button>
          </div>
        </>
      ) : (
        <div>
          <Link
            to={`/store/products/${props.id}`}
            className="h-96 flex flex-col p-5"
          >
            <h2 className="font-semibold tracking-wide     text-slate-700 font-display">
              {props.name.length > 50
                ? `${props.name.slice(0, 60)}...`
                : props.name}
            </h2>
            <img
              className="m-auto h-40"
              src={props.image.replace("SL75", "SL500")}
              alt={props.name}
            />
            <p className="text-2xl font-display text-slate-700">
              $ {props.price === 0 ? 50 : props.price}
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
