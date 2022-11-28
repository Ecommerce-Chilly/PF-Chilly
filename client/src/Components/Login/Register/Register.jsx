import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../redux/actions/actions';
import { useHistory, Link } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
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
      <section class="bg-gray-50 ">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create an account
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatchCreateUser(newUser);
                }}
              >
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 "
                    required=""
                  />
                </div>

                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-main "
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-light text-gray-500 ">
                      I accept the{' '}
                      <a
                        class="font-medium text-main hover:underline "
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-main hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Create an account
                </button>
                {errorMsg.length > 0 ? (
                  <p className="text-red-400 text-center">{`${errorMsg}`}</p>
                ) : (
                  <></>
                )}
                <p class="text-sm font-light text-gray-500 ">
                  Already have an account?{' '}
                  <Link
                    to="user/info"
                    class="font-medium text-main hover:underline "
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* 
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatchCreateUser(newUser);
          setTimeout(() => history.push('/user/info'), 2000);
        }}
      >
        <p>E-mail:</p>
        <input type="text" name="email" onChange={handleChange} />
        <p>Password:</p>
        <input type="password" name="password" onChange={handleChange} />
        <br></br>
        <input type="submit" />
      </form>
      {errorMsg.length > 0 ? <p>{`${errorMsg}`}</p> : <></>} */}
    </div>
  );
}

export default Register;
