import React from 'react';

function ArticleCard() {
  return (
    <div class="max-w-sm p-6  bg-white border border-gray-200 rounded-lg shadow-md flex-row ">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          Noteworthy technology acquisitions 2021
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-400 font-display">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aspernatur cumque expedita temporibus quos, quia ea
        iure a fugit id distinctio consectetur dolor nam vel aperiam unde nisi.
        Amet, libero minus.
      </p>
      <a
        href="#"
        class="flex pl-11 m-auto my-7 text-white bg-main border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded w-2/4"
      >
        Read more
      </a>
    </div>
  );
}

export default ArticleCard;
