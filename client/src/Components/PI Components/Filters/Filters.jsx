import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoryDetails,
  filter1,
  filterbyDetails,
} from '../../../redux/actions/actions.js';
import store from '../../../redux/store/store';

function Filters() {
  let [details, setDetails] = useState({});
  let [category, setCategory] = useState('');
  let [inputs, setInputs] = useState([]);
  let dispatch = useDispatch();
  let categoryDetails = useSelector((state) => state.categoryDetails);

  useEffect(() => {
    dispatch(filterbyDetails(category, details));
  }, [details, category]);

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
          console.log(inputs);
        }
      }
      console.log(categoryDetail);
    };
    getDetails();
    dispatch(filter1(e.target.value));
  };

  return (
    <div className="bg-slate-200 w-60 pl-5 pt-8 h-full">
      <h3 className="text-2xl uppercase mb-4">Category</h3>
      <select
        className="border-solid border-black bg-white rounded w-11/12 h-7"
        onChange={(e) => {
          dispatchCategory(e);
          setCategory(e.target.value);
        }}
      >
        <option value="">Select category</option>
        <option value="cases">Cases</option>
        <option value="motherboards">Motherboards</option>
        <option value="case_fan">Case Fan</option>
        <option value="cpu_fan">CPU Fan</option>
        <option value="gpus">GPUs</option>
        <option value="keyboards">Keyboards</option>
        <option value="mouses">Mouses</option>
        <option value="processors">Processors</option>
        <option value="power_supply">Power Supply</option>
        <option value="ram">RAM</option>
        <option value="storage">Storage</option>
      </select>
      {inputs.length > 0 &&
        inputs?.map((e) => {
          return (
            <>
              <div className=" border-b-1 mb-7 h-7 w-36 bg-gradient-to-r from-main  to-slate-200">
                <p className="bg-slate-200  uppercase my-5 ">{e}</p>
              </div>
              {categoryDetails[e]?.map((element) => (
                <div className="flex justify-between">
                  <label className=" w-40">{element}</label>
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
  );
}

export default Filters;
