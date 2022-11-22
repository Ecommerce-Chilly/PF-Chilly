import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryDetails, filter1 } from '../../../redux/actions/actions.js';
import store from '../../../redux/store/store';

function Filters() {
  let [inputs, setInputs] = useState([]);
  let dispatch = useDispatch();
  let products = useSelector((state) => state.product);
  let categoryDetails = useSelector((state) => state.categoryDetails);

  let dispatchCategory = (e) => {
    setInputs([]);

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
      console.log(inputs);
    };
    getDetails();
    dispatch(filter1(e.target.value));
  };

  return (
    <div>
      <select onChange={dispatchCategory}>
        <option value="">------</option>
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
              <p>{e}</p>
              {categoryDetails[e]?.map((element) => (
                <>
                  <label>{element}</label>
                  <input type="radio" name={e} value={element}></input>
                  <br></br>
                </>
              ))}
            </>
          );
        })}
    </div>
  );
}

export default Filters;
