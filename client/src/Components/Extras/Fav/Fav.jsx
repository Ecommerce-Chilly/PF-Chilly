import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkInProgress from "../../PI Components/WorkInProgress/WorkInProgress";
import { getFavorites, deleteFavorite } from "../../../redux/actions/actions";

function Fav() {
  let dispatch = useDispatch();
  let userInfo = useSelector((state) => state.userInfo);
  let favorites = useSelector((state) => state.favorites);
  let token = localStorage.getItem("token");
  token = JSON.parse(token);

  React.useEffect(() => {
    console.log(userInfo[0]?.id);
    if (userInfo[0]) {
      dispatch(getFavorites(userInfo[0].id, token));
    }
  }, []);

  return (
    <div>
      {favorites.length > 0 ? (
        favorites.map((e) => (
          <div>
            <h1>{e.name}</h1>
            <img src={e.image}></img>
            <button
              onClick={() => {
                dispatch(
                  deleteFavorite({
                    userId: userInfo[0].id,
                    productId: e.id,
                    token,
                  })
                );
                dispatch(getFavorites(userInfo[0].id, token));
              }}
            >
              X
            </button>
          </div>
        ))
      ) : (
        <h1>You have no favorites</h1>
      )}
    </div>
  );
}

export default Fav;
