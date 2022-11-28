import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userSpecific,
  logoutUser,
} from "../../../redux/actions/actions";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const userUnique = useSelector((state) => state.userInfo);
  const userNotFound = useSelector((state) => state.userNotFound);


  const handleChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };

  function dispatchLoginUser(email, password) {
    dispatch(userSpecific(email, password));
  }

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutUser());
  }

  return (
    <div>
      {!userUnique.length ? (
        <>
          <div>
            <p>E-mail:</p>
            <input type="text" name="email" onChange={handleChange} />
            <p>Password:</p>
            <input type="password" name="password" onChange={handleChange} />
            <br/>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                dispatchLoginUser(loginUser);
              }}
            >
              Login
            </button>
            {userNotFound ? <p>{`${userNotFound}`} </p> : <></>}
            <Link to="/register">
              <h2>Register</h2>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2>User info:</h2>
          <h2>Email: {userUnique[0].email} </h2>
          <h2>CreatedAt: {userUnique[0].createdAt} </h2>
          <button onClick={(e) => handleLogout(e)}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Login;
