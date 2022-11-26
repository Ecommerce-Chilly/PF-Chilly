import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSpecific, logoutUser } from "../../../redux/actions/actions";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const userUnique = useSelector((state) => state.userSpecific);

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };

  let oneUser = [];

  function dispatchLoginUser(loginUser) {
    oneUser = user.filter((e) => e.email === loginUser.email);
    if (user.includes(oneUser[0])) {
      dispatch(userSpecific(oneUser[0].id));
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div>
      {!userUnique.length ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatchLoginUser(loginUser);
            }}
          >
            <label>E-mail:</label>
            <input type="text" name="email" onChange={handleChange} />
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} />
            <input type="submit" />
          </form>
          <Link to="/register">
            <h2>Registrarte</h2>
          </Link>
        </div>
      ) : (
        <>
          <h2>User info:</h2>
          <h2>Email: {userUnique[0].email} </h2>
          <h2>CreatedAt: {userUnique[0].createdAt} </h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Login;
