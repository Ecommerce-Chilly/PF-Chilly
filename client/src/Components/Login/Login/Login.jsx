import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import './popUp.css';
function Login() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <h1>Loading...</h1>;
  return <div>{isAuthenticated ? <Profile /> : <LoginButton />}</div>;
}

export default Login;
