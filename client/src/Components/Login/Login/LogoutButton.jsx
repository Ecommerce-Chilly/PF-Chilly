import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/actions/actions';
const LogoutButton = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        logout({ returnTo: 'http://localhost:3000/home' });
        dispatch(logoutUser());
        localStorage.removeItem('token');
        localStorage.removeItem('email');
      }}
    >
      logout
    </button>
  );
};

export default LogoutButton;
