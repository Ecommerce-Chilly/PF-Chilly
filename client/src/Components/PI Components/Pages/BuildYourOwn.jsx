import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addToBuild,
  deleteFromBuild,
  byoToCart,
  updateCartQuantity,
  clearBYO,
} from "../../../redux/actions/actions";
import { useState } from "react";
import { useEffect } from "react";
function BuildYourOwn() {
  let history = useHistory();
  let byo = useSelector((state) => state.build);
  console.log(byo);
  let products = useSelector((state) => state.allProduct);
  let dispatch = useDispatch();
  let [i, setI] = useState(-1);
  let categories = [
    "processors",
    "motherboards",
    "cpu_fan",
    "ram",
    "gpus",
    "storage",
    "power_supply",
    "cases",
    "case_fan",
    "mouses",
    "keyboards",
  ];

  useEffect(() => {
    console.log(i);
    console.log(categories[i]);
  }, [i]);

  return (
    <>
      <button
        onClick={() => {
          dispatch(deleteFromBuild());
          setI(i - 1);
        }}
      >
        Back
      </button>
      <br></br>
      <div>
        {byo?.map((component) => {
          return (
            <div>
              {/* <img src={component.image} alt={component.name} /> */}
              <p>
                {typeof component === "object" ? component.name : component}
              </p>
            </div>
          );
        })}
      </div>
      <br></br>
      <br></br>
      <div>
        {!byo[0] ? (
          <>
            <button
              onClick={() => {
                dispatch(addToBuild("intel"));
                setI(i + 1);
              }}
            >
              INTEL
            </button>
            <button
              onClick={() => {
                dispatch(addToBuild("amd"));
                setI(i + 1);
              }}
            >
              AMD
            </button>
          </>
        ) : null}

        {byo[0]
          ? products
              .filter((e) => e.categoryName === categories[i])
              .map((component) => (
                <div
                  key={component.id}
                  onClick={() => {
                    dispatch(addToBuild(component.id));
                    setI(i + 1);
                  }}
                >
                  <p key={component.id}>{component.name}</p>
                </div>
              ))
          : null}
      </div>
      {i < categories.length && i > -1 ? (
        <button onClick={() => setI(i + 1)}>Skip</button>
      ) : null}
      {i === categories.length ? (
        <button
          onClick={() => {
            dispatch(byoToCart(byo));
            dispatch(updateCartQuantity());
            dispatch(clearBYO());
            setI(-1);
            history.push("/cart");
          }}
        >
          CheckOut
        </button>
      ) : null}
    </>
  );
}

export default BuildYourOwn;