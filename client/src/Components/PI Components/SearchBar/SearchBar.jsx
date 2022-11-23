import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductByName } from "../../../redux/actions/actions";

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
      setName("");
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search product"
        onChange={(event) => handleInput(event)}
      />
      <button type="submit" onClick={(event) => handleSubmit(event)}>
        Search
      </button>
    </>
  );
}

export default SearchBar;
