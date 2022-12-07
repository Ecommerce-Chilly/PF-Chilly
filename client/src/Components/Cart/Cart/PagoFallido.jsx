import React from 'react';
import { Link } from 'react-router-dom';

function PagoFallido() {
  return (
    <div>
      <div class="h-full my-20 font-display ">
        <div class="bg-white p-6  md:mx-auto">
          <div className="w-24 m-auto mb-9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 51.976 51.976"
            >
              <g>
                <path
                  fill="#D22B2B"
                  d="M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0
        C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778
        c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828
        c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828
        l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"
                />
              </g>
            </svg>
          </div>
          <div class="text-center">
            <h3 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl">
              Payment Failed!
            </h3>
            <p class="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
              Please try again.
            </p>
            <p className="font-light mt-4 mb-9 text-gray-500 md:text-sm xl:text-xl dark:text-gray-400">
              Have a great day!
            </p>
            <div class="py-10 text-center">
              <Link
                to="/"
                class="cursor-pointer font-semibold  text-white border-solid bg-main border-2 border-main py-2 px-6 focus:outline-none hover:bg-blue-600 rounded hover:border-blue-600"
              >
                Back to Homepage!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagoFallido;
