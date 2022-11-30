import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteP, clearCart } from '../../../redux/actions/actions';
import CartItem from '../CartItem/CartItem';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalPrice = totalPrice + cart[i].price * cart[i].quantity;
  }

  const deleteProduct = (id) => {
    dispatch(deleteP(id));
  };

  const cCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="mb-36">
      <h1 className="text-slate-800 text-3xl font-display font-semibold mt-12 ml-60 mb-9">
        Your shopping cart:
      </h1>
      {cart.length > 0 ? (
        cart?.map((e) => (
          <div className=" ">
            <CartItem
              image={e.image}
              name={e.name}
              quantity={e.quantity}
              price={e.price}
              id={e.id}
            />
          </div>
        ))
      ) : (
        <div>
          <h1 className="text-center text-slate-800 text-3xl font-display mb-9">
            Cart is empty!
          </h1>
          <div className="text-center text-lg">
            <Link
              to="/store"
              className="m-auto font-semibold  text-main py-2 px-6  hover:underline"
            >
              Browse products
            </Link>
          </div>
        </div>
      )}
      {cart.length > 0 ? (
        <>
          <div className=" w-2/3 px-7 text-right relative mb-20 m-auto border-solid border-slate-800 border-t-4 mt-8">
            <h1 className="text-slate-800 text-2xl my-9 text-display">
              Total Price: $ {totalPrice}
            </h1>
            <div className="w-80 absolute right-0 flex ">
              <button
                className="font-semibold text-main border-solid border-main  border-2 py-2 px-6 focus:outline-none hover:bg-blue-100  rounded w-36 mr-8"
                onClick={cCart}
              >
                Clear Cart
              </button>
              <Link to="#" className="">
                <button className=" flex font-semibold  text-white border-solid bg-main border-2 border-main py-2 px-6 focus:outline-none hover:bg-blue-600 rounded hover:border-blue-600">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Cart;
