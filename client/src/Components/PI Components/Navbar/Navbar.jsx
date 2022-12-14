import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useAuth0 } from '@auth0/auth0-react';
import {
  getProduct,
  getCartFromBack2,
  getCartFromBack,
  userSpecific,
  updateCartQuantity,
} from '../../../redux/actions/actions';


function Navbar() {
  let admin = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  let { userInfo, quantity, cart } = useSelector((state) => state);
  const { loginWithRedirect } = useAuth0();
  let token = localStorage.getItem('token');
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    dispatch(getProduct());
    dispatch(userSpecific(userInfo.email, JSON.parse(token)));
    if (userInfo.id) {
      dispatch(getCartFromBack2(userInfo.id));
      dispatch(getCartFromBack(userInfo.id));
    }
    setTimeout(() => {
      dispatch(updateCartQuantity());
    }, 2000);
  }, [dispatch, userInfo?.email]);

  return (
    <div className="borde">
      <nav class=" border-gray-200 px-2  py-5 bg-main static">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" class="flex items-center">
            <span class="self-center text-4xl font-semibold whitespace-nowrap text-white font-sans">
              Chilly
            </span>
          </Link>
          <SearchBar />

          <div class="w-auto" id="navbar-default">
            <Link to="/user/favorites" className="inline-block mx-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </Link>
            <Link to="/cart" className="inline-block mx-4">
              {cart.length === 0 ? (
                <></>
              ) : (
                <div className=" font-display -top-2 font-medium left-3 text-main text-sm text-center relative box-content	">
                  <p className="w-5 h-5 bg-white z-10 rounded-full border-1 absolute">
                    {quantity}
                  </p>
                </div>
              )}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
            {isAuthenticated ? (
              <Link to="/user/info" className="inline-block mx-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                className="inline-block mx-4"
                onClick={() => {loginWithRedirect(); window.localStorage.setItem('cart', JSON.stringify(cart));}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
        <div class="container flex w-2/3 mx-auto mt-6">
          <ul class="flex justify-between max-w-2xl w-5/6 mx-auto uppercase font-sans underline-offset-4  font-light text-white">
            <li>
              
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/store" className="hover:underline">
                Store
              </Link>
            </li>
            <li>
              <Link to="/build+your+own" className="hover:underline">
                Build Your Own
              </Link>
            </li>
            {/* <li>
              <Link to="/special+offers" className="hover:underline">
                Special Offers
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </li> */}
            <li>
              <Link to="/about+us" className="hover:underline">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* {admin === true ? <AdminNavbar></AdminNavbar> : <></>} */}
      {/* <nav className="bg-white px-2 sm:px-4 py-2.5 bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 border-gray-600">
       
      </nav> */}
    </div>
  );
}

export default Navbar;
