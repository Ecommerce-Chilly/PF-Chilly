import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPage,
  nextPage,
  previousPage,
} from "../../../redux/actions/actions.js";

function Paginate({ filtered }) {
  const dispatch = useDispatch();
  const { page, productPerPage } = useSelector((state) => state);
  const handleSetPage = (n) => dispatch(setPage(n));


  return (
    <div className="flex justify-around">
      {page > 1 ? (
        <button onClick={() => (page > 0 ? dispatch(previousPage()) : null)}>
          Prev
        </button>
      ) : (
        <></>
      )}
      <div>
        <button onClick={() => handleSetPage(setPage)}>{page}</button>
        <label>/</label>
        <button>{Math.floor(filtered.length / productPerPage)} </button>
      </div>

      {page < Math.floor(filtered.length / productPerPage) ? (
        <button
          onClick={() =>
            page + 1 < filtered.length / productPerPage
              ? dispatch(nextPage())
              : null
          }
        >
          Next
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Paginate;
