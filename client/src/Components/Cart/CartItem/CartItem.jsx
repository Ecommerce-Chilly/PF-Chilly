import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteP } from '../../../redux/actions/actions';

function CartItem({ name, quantity, price, image, id }) {
  const dispatch = useDispatch();
  const deleteProduct = (id) => {
    dispatch(deleteP(id));
  };
  return (
    <div className=" w-2/3 px-7 text-slate-800 m-auto border-solid border-slate-200 border-t-2 py-4 text-mono">
      <div class="flex justify-between items-center h-52 w-full">
        <div class="flex  items-center   h-full w-3/4  mr-4 ">
          <div className="h-full w-60 ">
            <img src={image.replace('SL75', 'SL500')} class=" h-full m-auto" />
          </div>
          <div class="flex flex-col ml-3 w-3/5">
            <span class="md:text-md font-medium">{name}</span>
          </div>
        </div>

        <div class="flex justify-around  items-center   w-60">
          <div class=" pr-8 flex text-base">
            <span class="font-semibold">-</span>
            <input
              type="text"
              class="focus:outline-none bg-gray-100  h-6 w-8 rounded  px-2 mx-2"
              value={quantity}
            />
            <span class="font-semibold">+</span>
          </div>
          <div class="pr-8 ">
            <span class=" font-medium">${price * quantity}</span>
          </div>
          <div>
            <i class="fa fa-close text-xs font-medium"></i>
          </div>{' '}
          <button
            className="font-bold text-2xl"
            onClick={() => deleteProduct(id)}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
