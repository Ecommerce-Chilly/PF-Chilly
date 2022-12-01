import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  userSpecific,
  logoutUser,
  clearFavSate,
} from '../../../redux/actions/actions';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './popUp.css';

function Login() {
  const dispatch = useDispatch();
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });
  const userUnique = useSelector((state) => state.userInfo);
  const userNotFound = useSelector((state) => state.userNotFound);

  const handleChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };

  const saveInLocalStorage = (user) => {
    window.localStorage.setItem('user', JSON.stringify(user));
  };

  function dispatchLoginUser(email, password) {
    dispatch(userSpecific(email, password));
  }

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutUser());
  }
  const confirmLogout = () => {
    Swal.fire({
      icon: 'question',
      text: 'Are you sure you want to log out?',
      confirmButtonText: 'Yes',
      showDenyButton: 'true',
      denyButtonText: 'No',
      customClass: {
        container: 'popup-container',
        popup: 'popup',
        confirmButton: 'confirm',
        denyButton: 'deny',
        cancelButton: 'cancel',
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(logoutUser());
        dispatch(clearFavSate());
        window.localStorage.removeItem('user');
      }
    });
  };
  return (
    <div>
      {!userUnique.length ? (
        <>
          <section class="bg-gray-50">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Sign in to your account
                  </h1>
                  <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5  "
                        placeholder="name@company.com"
                        required=""
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900"
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
                        onChange={handleChange}
                      />
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-main"
                            required=""
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="remember" class="text-gray-500 ">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        class="text-sm font-medium text-main hover:underline "
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-main hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      onClick={(e) => {
                        e.preventDefault();
                        dispatchLoginUser(loginUser);
                        saveInLocalStorage(loginUser);
                      }}
                    >
                      Sign in
                    </button>
                    {userNotFound ? (
                      <p className="text-red-400 text-center">
                        {`${userNotFound}`}
                      </p>
                    ) : (
                      <></>
                    )}
                    <p class="text-sm font-light text-gray-500 ">
                      Don’t have an account yet?{' '}
                      <Link
                        to="/register"
                        class="font-medium text-main hover:underline"
                      >
                        Sign up
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* <h2>User info:</h2>
          <h2>Email: {userUnique[0].email} </h2>
          <h2>CreatedAt: {userUnique[0].createdAt} </h2>
          <button onClick={(e) => handleLogout(e)}>Logout</button> */}
          <h2 className="text-slate-800 text-3xl font-display font-semibold mt-12 ml-60 mb-9">
            User profile
          </h2>
          <div class="flex min-h-screen -mt-36 w-full items-center justify-center m-4">
            <div class="w-full rounded-lg p-12 shadow-xl  md:w-8/12 lg:w-6/12 bg-white">
              <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div class="grid-cols-1 lg:col-span-3">
                  <div class="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full bg-blue-100 p-4">
                    <svg
                      id="logo-39"
                      width="50"
                      height="40"
                      viewBox="0 0 50 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.0001 0L50 15.0098V24.9863L25.0001 40L0 24.9863V15.0099L25.0001 0Z"
                        fill="#A5B4FC"
                        class="ccompli2"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0 15.0098L25 0L50 15.0098V24.9863L25 40L0 24.9863V15.0098ZM25 33.631L44.6967 21.8022V18.1951L44.6957 18.1945L25 30.0197L5.30426 18.1945L5.3033 18.1951V21.8022L25 33.631ZM25 24.5046L40.1018 15.4376L36.4229 13.2298L25 20.0881L13.5771 13.2298L9.89822 15.4376L25 24.5046ZM25 14.573L31.829 10.4729L25 6.37467L18.171 10.4729L25 14.573Z"
                        fill="#4F46E5"
                        class="ccustom"
                      ></path>
                      <path
                        d="M25.0001 0L0 15.0099V24.9863L25 40L25.0001 0Z"
                        fill="#A5B4FC"
                        class="ccompli2"
                        fill-opacity="0.3"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div class="col-span-1 lg:col-span-9 ">
                  <div class="text-center lg:text-left">
                    <h2 class="text-2xl font-bold text-zinc-700">User info</h2>
                    <p class="mt-2 font-semibold text-zinc-700">
                      Email: {userUnique[0].email}
                    </p>
                    <p class="mt-4 text-zinc-500">
                      Member since: {userUnique[0].createdAt}{' '}
                    </p>
                  </div>

                  <div class="w-1/2 mt-9 mx-5">
                    <button
                      class="w-full rounded border-2 border-main bg-white px-3 py-2 font-semibold text-main hover:bg-main hover:text-white "
                      onClick={(e) => {
                        confirmLogout();
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
