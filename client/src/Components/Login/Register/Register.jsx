import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../../redux/actions/actions";
import { useHistory } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  function dispatchCreateUser(newProduct) {
    dispatch(createUser(newProduct));
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatchCreateUser(newUser);
        }}
      >
        <label>E-mail:</label>
        <input type="text" name="email" onChange={handleChange} />
        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Register;
