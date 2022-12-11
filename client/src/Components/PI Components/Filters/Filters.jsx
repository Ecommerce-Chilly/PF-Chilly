import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoryDetails,
  filter1,
  filterbyDetails,
  getProduct,
  orderByPrice,
  allCategories,
} from '../../../redux/actions/actions.js';
import store from '../../../redux/store/store';

function Filters() {
  let [details, setDetails] = useState({});
  let [category, setCategory] = useState('');
  let [inputs, setInputs] = useState([]);
  let [filterPrice, setFilterPrice] = useState('');
  let dispatch = useDispatch();
  let { categoryDetails } = useSelector((state) => state);
  let anyMoreCategory = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(filterbyDetails(category, details));
  }, [details, category]);
  useEffect(() => {
    dispatch(allCategories());
  }, []);

  let dispatchCategory = (e) => {
    setInputs([]);
    setDetails({});
    const getDetails = async () => {
      await dispatch(getCategoryDetails(e.target.value));
      let categoryDetail = store.getState().categoryDetails;
      for (const element in categoryDetail) {
        console.log(element);
        if (element !== 'name') {
          setInputs((oldArray) => [...oldArray, element]);
        }
      }
    };
    getDetails();
    dispatch(filter1(e.target.value));
  };
  function handleClearFilters(event) {
    event.preventDefault();
    dispatch(getProduct());
  }

  function handleFilterByPrice(event) {
    event.preventDefault();
    setFilterPrice(event.target.value);
    dispatch(orderByPrice(event.target.value));
  }

  return (
    <>
      <div className="bg-slate-200 w-60 pl-5 pt-8 h-full min-h-screen">
        <h3 className="text-2xl uppercase font-medium mb-4 text-slate-800 font-display">
          Filters
        </h3>
        <div className="mb-7">
          <h2 className="mb-2 font-medium uppercase text-sm text-slate-800 font-display">
            Sort by price
          </h2>
          <select
            onChange={(event) => handleFilterByPrice(event)}
            className="border-solid border-black bg-white rounded w-11/12 h-7 text-slate-800"
            value={filterPrice}
          >
            <option key="default" value="default">
              Price
            </option>
            <option key="Asc" value="Asc">
              Descending
            </option>
            <option key="Dsc" value="Dsc">
              Ascending
            </option>
          </select>
        </div>
        <div>
          <button
            onClick={(event) => {
              handleClearFilters(event);
              setCategory('');
              setInputs([]);
              setFilterPrice('');
            }}
            className=" absolute left-40 ml-1 top-44 z-10 border-solid border-main rounded border-2 px-2.5"
          >
            Reset
          </button>
        </div>
        <h3 className="mb-2 font-medium uppercase text-sm text-slate-800 font-display">
          Category
        </h3>
        <select
          className="border-solid border-black bg-white rounded w-11/12 h-7 text-slate-800"
          value={category}
          onChange={(e) => {
            dispatchCategory(e);
            setCategory(e.target.value);
          }}
        >
          {anyMoreCategory?.map((e) => (
            <option key={e} value={e}>
              {e[0].toUpperCase() + e.substring(1)}
            </option>
          ))}
        </select>
        {inputs.length > 0 &&
          inputs?.map((e) => {
            return (
              <>
                <div className=" border-b-1  w-36 bg-slate-800">
                  <p className="bg-slate-200  uppercase mt-5 pt-3 mb-2 text-slate-800 font-bold ">
                    {e}
                  </p>
                </div>
                {categoryDetails[e]?.map((element) => (
                  <div className="flex justify-between">
                    <label className="w-40 font-regular text-slate-800">
                      {element}
                    </label>
                    <input
                      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-main checked:border-sky-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="radio"
                      name={e}
                      value={element}
                      onClick={(e) => {
                        setDetails({
                          ...details,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    ></input>
                    <br></br>
                  </div>
                ))}
              </>
            );
          })}
      </div>
    </>
  );
}

export default Filters;
