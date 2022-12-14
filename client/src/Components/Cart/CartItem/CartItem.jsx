import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteP,
  increaseProductQuantity,
  decreaseProductQuantity,
  updateCartQuantity,
  deleteFromCartBack,
  getCartFromBack,
  putCartFromBack,
} from '../../../redux/actions/actions';
import store from '../../../redux/store/store';

function CartItem({ name, quantity, price, image, id, changeVariable }) {
  const dispatch = useDispatch();
  let storeQuantity = useSelector((state) => state.quantity);
  let { userInfo, ostras } = useSelector((state) => state);
  const msgPuto = useSelector((state) => state.msgPuto);
  const deleteProduct = (id) => {
    dispatch(deleteP(id));
    dispatch(updateCartQuantity());
    dispatch(deleteFromCartBack(ostras[0].id, id));
    setTimeout(() => {
      dispatch(getCartFromBack(userInfo.id));
    }, 2000);
  };
  const changeModify = async (e) => {
    if (e.target.value === '-') {
      dispatch(decreaseProductQuantity(id));
      if (userInfo.id) {
        let quantity = store.getState().quantity;
        await dispatch(putCartFromBack(ostras[0].id, id, quantity));
        await dispatch(getCartFromBack(userInfo.id));
      }
    }
    if (e.target.value === '+') {
      dispatch(increaseProductQuantity(id));
      let quantity = store.getState().quantity;
      await dispatch(putCartFromBack(ostras[0].id, id, quantity));
      await dispatch(getCartFromBack(userInfo.id));
    }
  };

  React.useEffect(() => {
    changeVariable(storeQuantity);
  }, [storeQuantity]);

  return (
    <div className=" w-2/3 px-7 text-slate-800 m-auto border-solid border-slate-200 border-t-2 py-4 text-mono">
      <div className="flex justify-between items-center h-52 w-full">
        <div className="flex  items-center   h-full w-3/4  mr-4 ">
          <div className="h-full w-60 ">
            <img src={image.replace('SL75', 'SL500')} class=" h-full m-auto" />
          </div>
          <div className="flex flex-col ml-3 w-3/5">
            <span className="md:text-md font-medium">{name}</span>
          </div>
        </div>

        <div className="flex justify-between  items-center   w-60">
          <div className="  flex text-base flex-row items-center ">
            <button
              value="-"
              onClick={changeModify}
              className="font-semibold w-9 rounded  text-center cursor-pointer text-lg hover:bg-main hover:text-white"
            >
              -
            </button>
            <input
              type="text"
              className="focus:outline-none bg-gray-100  h-6 w-10  rounded text-center  px-2 mx-2 text-lg"
              value={quantity}
              disabled
            />
            <button
              value="+"
              onClick={changeModify}
              className="font-semibold w-9 rounded  text-center cursor-pointer text-lg hover:bg-main hover:text-white"
            >
              +
            </button>
          </div>
          <div className="flex items-center justify-between ">
            <div className="mr-10 w-16    ml-6">
              <span className="   font-medium">
                ${(price * quantity).toFixed(2)}
              </span>
            </div>
            <button
              className="font-bold text-2xl"
              onClick={() => deleteProduct(id)}
            >
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
