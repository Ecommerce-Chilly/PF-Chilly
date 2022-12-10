import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, getAllUsers } from '../../../redux/actions/actions';
export default function Users() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const users = useSelector((state) => state.users);

  return (
    <>
      <div>
        <Link
          to="/panel+admin"
          className="  font-medium  text-main  border-solid  px-2.5"
        >
          Back to Panel Admin
        </Link>
      </div>
      <div>
        {users?.map((user) => (
          <div
            key={user.name}
            className="w-1/2 mb-11 bg-white rounded-xl shadow-xl border  m-2 relative flex"
          >
            <div className="w-1/4 border-2 h-13">
              <img src={user.img} alt={user.name} />
            </div>
            <div>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
            {user.admin === true ? <p>Admin: YES</p> : <p>Admin:NO</p>}
            {user.admin === null ? (
              <button
                onClick={() => {
                  dispatch(deleteUser(JSON.parse(token), user.id));
                }}
              >
                Delete User
              </button>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
