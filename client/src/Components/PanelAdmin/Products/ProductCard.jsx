import React, { useState } from "react";
import { deleteProdut } from "../../../redux/actions/actions.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  function dispatchToDeleteProduct(id) {
    dispatch(deleteProdut(id));
    setOpen(!open);
  }

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
                dispatchToDeleteProduct(props.id);
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
