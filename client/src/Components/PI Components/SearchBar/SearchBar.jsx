import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductByName } from '../../../redux/actions/actions';

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(0);

  function handleInput(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (name) {
      dispatch(getProductByName(name));
      setName('');
    }
  }

  return (
    <>
      {/* <div class="absolute  left-1/2 transform -translate-x-1/2  ">
        <div class=" flex items-center w-full h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              type="submit"
              onClick={(event) => handleSubmit(event)}
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
            placeholder="Search product"
            onChange={(event) => handleInput(event)}
          />
        </div>
      </div> */}

      <form className="w-2/6 absolute  left-1/2 transform -translate-x-1/2 ">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            onChange={(event) => handleInput(event)}
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search products..."
            required
          />
          <button
            type="submit"
            onClick={(event) => handleSubmit(event)}
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      {/* 
      <input
        type="text"
        placeholder="Search product"
        onChange={(event) => handleInput(event)}
      />
      <button type="submit" onClick={(event) => handleSubmit(event)}>
        Search
      </button> */}
    </>
  );
}

export default SearchBar;
