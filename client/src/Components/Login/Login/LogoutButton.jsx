import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/actions/actions";

const LogoutButton = () => {
  const { logout } = useAuth0();
  let dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        logout();
        dispatch(logoutUser());
      }}
    >
      logout
    </button>
  );
};

export default LogoutButton;
