import {
  deleteProdut,
  restoreProduct,
} from '../../../redux/actions/actions.js';
import { useDispatch } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard(props) {
  const dispatch = useDispatch();

  function dispatchToDeleteProduct(id) {
    dispatch(deleteProdut(id));
  }

  function dispatchToRestore(id) {
    dispatch(restoreProduct(id));
  }
  let newImage = props.image.replace('SL75', 'SL500');
  return (
    <div className="w-72 h-96 mb-11 bg-white rounded-xl shadow-xl border  m-2 relative flex flex-col justify-between">
      <Link
        to={`/panel+admin/products/${props.id}`}
        className="h-96 flex flex-col p-5"
      >
        {/* <div className="flex justify-between">
          <button
            onClick={() => {
              dispatchToDeleteProduct(props.id);
            }}
          >
            Want to delete? Click here!
          </button>
          <button
            onClick={() => {
              dispatchToRestore(props.id);
            }}
          >
            RESTORE_PRODUCT
          </button>
        </div> */}

        <h2>{props.name}</h2>
        <img className="m-auto h-40" src={newImage} alt={props.name} />
        {/* <p>{props.brand}</p> */}

        {/* <p>Category:{props.categoryName}</p> */}

        <p className="">$ {props.price}</p>
      </Link>
    </div>
  );
}

export default ProductCard;
