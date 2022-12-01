import React from 'react';
import { Link } from 'react-router-dom';
import {
  getFavorites,
  deleteFavorite,
  clearFavMsg,
} from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

function FavCards(props) {
  let userInfo = useSelector((state) => state.userInfo);
  let dispatch = useDispatch();

  return (
    <div className="w-72 h-96 mb-11 bg-white rounded-xl shadow-xl border  m-2  flex flex-col justify-between">
      <>
        <Link
          to={`/store/products/${props.id}`}
          className="h-96 flex flex-col p-5"
        >
          <h2 className="font-semibold tracking-wide  text-slate-700 font-display">
            {props.name.length > 40
              ? `${props.name.slice(0, 50)}...`
              : props.name}
          </h2>
          <img
            className="m-auto h-40"
            src={props.image.replace('SL75', 'SL500')}
            alt={props.name}
          />
        </Link>
        <div className="text-center mb-6">
          <button
            onClick={() => {
              dispatch(
                deleteFavorite({
                  userId: userInfo[0].id,
                  productId: props.id,
                })
              );
              dispatch(clearFavMsg());
              dispatch(getFavorites(userInfo[0].id));
            }}
            className="text-main font-semibold rounded px-3 py-1"
          >
            Remove
          </button>
        </div>
      </>
    </div>
  );
}

export default FavCards;
