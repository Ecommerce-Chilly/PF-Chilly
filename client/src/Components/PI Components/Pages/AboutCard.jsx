import React from 'react';

function AboutCard({ name }) {
  return (
    <div class=" w-72 m-2 h-96 text-center p-6 bg-white border border-gray-200 rounded-lg shadow-md mt-10 flex flex-col content-between">
      <div class="w-full ">
        <div className="m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="rgb(56,56,56)"
            className="m-auto w-24 h-24 mb-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h5 class="mb-2 text-xl font-bold tracking-tight text-slate-900 font-display">
            {name}
          </h5>
        </div>
      </div>
      <div className=" h-52 flex flex-col justify-between">
        <p class=" font-normal text-gray-600 font-display ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
          voluptatem omnis voluptate deserunt aut. Commodi eveniet distinctio
        </p>
        {/* <h4 className="font-display">Contact here</h4> */}
        <a
          href="#"
          class="inline-flex w-12 mx-auto items-center px-3 py-2 text-sm font-medium text-center text-white bg-main rounded-lg   focus:outline-none   hover:bg-blue-700 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default AboutCard;
