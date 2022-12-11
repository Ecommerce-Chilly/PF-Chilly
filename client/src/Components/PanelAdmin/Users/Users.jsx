import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, getAllUsers } from '../../../redux/actions/actions';
import { useState, useEffect } from 'react';
import { clearMsg } from '../../../redux/actions/actions';
import Swal from 'sweetalert2';

export default function Users() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const users = useSelector((state) => state.users);
  const msg = useSelector((state) => state.msg);

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [users]);

  const confirmDeleteUser = (id) => {
    Swal.fire({
      icon: 'question',
      text: 'Are you sure you want to delete this user?',
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
        dispatch(deleteUser(JSON.parse(token), id));
        dispatch(getAllUsers(token));
      }
    });
  };

  return (
    <div className=" min-h-screen">
      <div className="mb-10 min">
        <h1 className="text-slate-800 text-3xl font-display font-semibold mt-12 ml-60 mb-9">
          User list:
        </h1>
        <Link
          to="/panel+admin"
          className="font-medium text-main ml-60 pb-9 top-44 z-10 border-solid  "
        >
          Back to Panel Admin
        </Link>
      </div>
      <div className="text-slate-900">
        {users?.map((user) => (
          <div
            key={user.name}
            className="w-1/2 mb-11 bg-white rounded-xl shadow-xl border  m-2  flex mx-auto justify-evenly h-32"
          >
            <div className=" w-1/4 my-auto">
              <img
                src={user.img}
                alt={user.name}
                className="rounded-full mx-auto"
              />
            </div>
            <div className=" w-2/4 my-auto">
              <p className="mb-1">
                <span className="font-bold">Username:</span> {user.name}
              </p>
              <p className="mb-1">
                <span className="font-bold">Email:</span> {user.email}
              </p>
              {user.admin === true ? <p>Administrator</p> : <p>Regular User</p>}
            </div>
            <div className="flex content-center relative w-40 ">
              {user.admin === null ? (
                <button
                  onClick={() => {
                    confirmDeleteUser(user.id);
                  }}
                  className="text-main font-semibold rounded  right-5 top-1/3 px-3 py-1  "
                >
                  Delete User
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
