import React, { useState } from "react";
import {
  restoreProduct,
  clearDeleted,
} from "../../../redux/actions/actions.js";
import { useDispatch } from "react-redux";
import "./ProductCard.css";

function ProductCard(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  function dispatchToRestore(id) {
    dispatch(restoreProduct(id));
    dispatch(clearDeleted(id));
    setOpen(!open);
  }

  return (
    <div
      className={`w-72 h-96 mb-11 bg-white rounded-xl shadow-xl border  m-2 relative flex flex-col justify-between ${
        open && "joder"
      }`}
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
      <div className="flex justify-evenly mb-6">
        <button
          className="bg-main text-white font-semibold rounded px-3"
          onClick={() => {
            dispatchToRestore(props.id);
          }}
        >
          Restore
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
