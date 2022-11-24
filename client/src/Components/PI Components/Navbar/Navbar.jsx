import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <>
      <nav class="	bg-white border-gray-200 px-2 sm:px-4 py-5  dark:bg-main static">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <a href="#" class="flex items-center">
            <span class="self-center text-4xl font-semibold whitespace-nowrap dark:text-white font-sans">
              Chilly
            </span>
          </a>

          <div class="absolute  left-1/2 transform -translate-x-1/2  ">
            <div class=" flex items-center w-full h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div class="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search something.."
              />
            </div>
          </div>

          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
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
          </div>
        </div>
        <div class="container flex  mx-auto mt-6">
          <ul class="flex justify-between w-5/6 mx-auto uppercase font-sans underline-offset-4  font-light text-white">
            <li>
              <a href="/home" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/store" className="hover:underline">
                Store
              </a>
            </li>
            <li>
              <a href="/build+your+own" className="hover:underline">
                Build Your Own
              </a>
            </li>
            <li>
              <a href="/special+offers" className="hover:underline">
                Special Offers
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="/about+us" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/panel+admin/products" className="hover:underline">
                PA - Products
              </a>
            </li>{' '}
            <li>
              <a href="/panel+admin/create/product" className="hover:underline">
                PA - Create Product
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
       
      </nav> */}
    </>
  );
}

export default Navbar;
