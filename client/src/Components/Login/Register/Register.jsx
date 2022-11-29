import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../redux/actions/actions";
import { useHistory } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const errorMsg = useSelector((state) => state.createUserMsg);

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
          setTimeout(() => history.push("/user/info"), 2000);
        }}
      >
        <p>E-mail:</p>
        <input type="text" name="email" onChange={handleChange} />
        <p>Password:</p>
        <input type="password" name="password" onChange={handleChange} />
        <br></br>
        <input type="submit" />
      </form>
      {errorMsg.length > 0 ? <p>{`${errorMsg}`}</p> : <></>}
    </div>
  );
}

export default Register;