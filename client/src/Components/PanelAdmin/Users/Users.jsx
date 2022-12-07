import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Users() {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <Link
        to="/panel+admin"
        className=" absolute font-medium left-64 text-main -ml-4 top-44 z-10 border-solid  px-2.5"
      >
        Back to Panel Admin
      </Link>
      {users?.map((user) => (
        <>
          <p>{user.name}</p> <img src={user.img} alt={user.name} />{" "}
          <p>{user.email}</p>
          {user.admin === true ? <p>Admin: YES</p> : <p>Admin:NO</p>}
          <button>Delete User</button>
        </>
      ))}
    </div>
  );
}
