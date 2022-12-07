import React from 'react';
import { Link } from 'react-router-dom';

function ForbiddenAccess() {
  return (
    <div className="my-20 text-gray-900 ">
      <section class="bg-white">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <div className="w-24 h-24 text-gray-400 m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class=""
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </div>
            <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl ">
              You have no access!
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl "></p>
            <p class="font-light mb-9 text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
              Sorry, this section is only for our Administrators.
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

export default ForbiddenAccess;
