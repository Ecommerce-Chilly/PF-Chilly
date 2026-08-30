import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/actions/actions';
import Swal from 'sweetalert2';
import { getAuth0RuntimeUrls } from '../../../config/auth0';

const LogoutButton = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();

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
        logout({
          logoutParams: { returnTo: getAuth0RuntimeUrls().logoutUri },
        });
        dispatch(logoutUser());
        localStorage.removeItem('token');
        localStorage.removeItem('email');
      }
    });
  };

  return (
    <div>
      <button
        className="w-full rounded border-2 border-main bg-white px-3 py-2 font-semibold text-main hover:bg-main hover:text-white "
        onClick={() => {
          confirmLogout();
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default LogoutButton;
