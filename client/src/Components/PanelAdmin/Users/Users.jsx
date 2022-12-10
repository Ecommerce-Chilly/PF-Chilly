import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getAllUsers } from "../../../redux/actions/actions";
export default function Users() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const users = useSelector((state) => state.users);

  return (
    <>
      <div>
        <Link
          to="/panel+admin"
          className=" absolute font-medium left-64 text-main -ml-4 top-44 z-10 border-solid  px-2.5"
        >
          Back to Panel Admin
        </Link>
      </div>
      <div>
        {users?.map((user) => (
          <div key={user.name}>
            <p>{user.name}</p> <img src={user.img} alt={user.name} />{" "}
            <p>{user.email}</p>
            {user.admin === true ? <p>Admin: YES</p> : <p>Admin:NO</p>}
            {user.admin === null ? (
              <button
                onClick={() => {
                  dispatch(deleteUser(JSON.parse(token), user.id));
                }}
              >
                Delete User
              </button>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
