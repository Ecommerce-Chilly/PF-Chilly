import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteP, clearCart } from "../../../redux/actions/actions";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalPrice = totalPrice + cart[i].price;
  }

  const deleteProduct = (id) => {
    dispatch(deleteP(id));
  };

  const cCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <h1>Cart:</h1>
      {cart.length > 0 ? (
        cart?.map((e) => (
          <div>
            <p>{e.name} </p> <p>{e.price}</p>{" "}
            <button onClick={() => deleteProduct(e.id)}>X</button>
          </div>
        ))
      ) : (
        <h1>Cart is empty</h1>
      )}
      {cart.length > 0 ? (
        <>
          <h1>Total Price: {totalPrice} </h1>{" "}
          <button onClick={cCart}>Clear Cart</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Cart;