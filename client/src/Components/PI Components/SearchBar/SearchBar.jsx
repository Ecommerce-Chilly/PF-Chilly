import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProductByName } from "../../../redux/actions/actions";

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(0);
  const history = useHistory();

  function handleInput(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (name) {
      dispatch(getProductByName(name));
      setName("");
    }
  }

  return (
    <>
      <form className="w-2/6   left-1/2 transform translate-x-10">
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
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
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search products..."
            required
          />
          <button
            type="submit"
            onClick={(event) => {
              handleSubmit(event);
              history.push("/store");
            }}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
