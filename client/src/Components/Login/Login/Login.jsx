import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userSpecific,
  logoutUser,
  getAllUsers,
} from "../../../redux/actions/actions";
import { Link } from "react-router-dom";
import store from "../../../redux/store/store";

function Login() {
  const dispatch = useDispatch();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const userUnique = useSelector((state) => state.userInfo);
  const userNotFound = useSelector((state) => state.userNotFound);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };

  function dispatchLoginUser(loginUser) {
    dispatch(userSpecific(loginUser));
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
            <br></br>
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
      ) : userUnique.length && !userNotFound ? (
        userUnique.map((e) => {
          if (
            e.email === loginUser.email &&
            e.password === loginUser.password
          ) {
            return (
              <div key={e.id} >
                <h2>User info:</h2>
                <h2>Email: {e.email} </h2>
                <h2>CreatedAt: {e.createdAt} </h2>
                <button onClick={(e) => handleLogout(e)}>Logout</button>
              </div>
            );
          } 
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default Login;
