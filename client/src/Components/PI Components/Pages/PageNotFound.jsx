import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
      <section class="bg-white my-20 ">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-main ">
              404
            </h1>
            <p class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl  ">
              Something's missing.
            </p>
            <p class="font-light mb-9 text-gray-500 md:text-lg xl:text-xl dark:text-gray-400 ">
              Sorry, we can't find that page.
            </p>
            <Link
              to="/home"
              class="cursor-pointer font-semibold  text-white border-solid bg-main border-2 border-main py-2 px-6 focus:outline-none hover:bg-blue-600 rounded hover:border-blue-600"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PageNotFound;
