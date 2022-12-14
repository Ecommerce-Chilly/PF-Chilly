import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postDataUser, clearProdMsg } from '../../../redux/actions/actions';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function CheckoutDataUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userDataMsg } = useSelector((state) => state);
  const [allDataUser, setAllDataUser] = useState({
    firstname: '',
    lastname: '',
    address: '',
    country: '',
    city: '',
    postalcode: '',
    mobile: '',
  });

  const handleCheckoutDataUser = (e) => {
    setAllDataUser({
      ...allDataUser,
      [e.target.name]: e.target.value,
    });
  };

  function dispatchDataToCheckout(allDataUser) {
    dispatch(postDataUser(allDataUser));
  }

  const creationStatusEdit = () => {
    if (userDataMsg === 'Sending incomplete information!') {
      Swal.fire({
        icon: 'error',
        text: userDataMsg,
        confirmButtonText: 'Retry',
        customClass: {
          container: 'popup-container',
          popup: 'popup',
          confirmButton: 'confirm',
          denyButton: 'deny',
          cancelButton: 'cancel',
        },
      }).then((r) => {
        {
          if (r.isConfirmed) {
            dispatch(clearProdMsg());
          }
        }
      });
    } else if (userDataMsg === 'Information completed! :D') {
      Swal.fire({
        icon: 'success',
        text: userDataMsg,
        confirmButtonText: 'Great!',
        customClass: {
          container: 'popup-container',
          popup: 'popup',
          confirmButton: 'confirm',
          denyButton: 'deny',
          cancelButton: 'cancel',
        },
      }).then((r) => {
        if (r.isConfirmed) {
          dispatch(clearProdMsg());
          history.push('/cart');
        }
      });
    }
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatchDataToCheckout(allDataUser);
        }}
      >
        <p>First name:</p>
        <input
          type="text"
          name="firstname"
          value={allDataUser.firstname}
          onChange={handleCheckoutDataUser}
          placeholder="Type your first name here"
        />
        <p>Last name:</p>
        <input
          type="text"
          name="lastname"
          value={allDataUser.lastname}
          onChange={handleCheckoutDataUser}
          placeholder="Type your last name here"
        />
        <p>Address:</p>
        <input
          type="text"
          name="address"
          value={allDataUser.address}
          onChange={handleCheckoutDataUser}
          placeholder="Type your address here"
        />
        <p>Country:</p>
        <input
          type="text"
          name="country"
          value={allDataUser.country}
          onChange={handleCheckoutDataUser}
          placeholder="Type your country here"
        />
        <p>City</p>
        <input
          type="text"
          name="city"
          value={allDataUser.city}
          onChange={handleCheckoutDataUser}
          placeholder="Type your city here"
        />
        <p>Postal code:</p>
        <input
          type="number"
          name="postalcode"
          value={allDataUser.postalcode}
          onChange={handleCheckoutDataUser}
          placeholder="Type your postalcode here"
        />
        <p>Contact</p>
        <input
          type="number"
          name="mobile"
          value={allDataUser.mobile}
          onChange={handleCheckoutDataUser}
          placeholder="Type your mobile here"
        />
        <p></p>
        <input type="submit" onClick={creationStatusEdit()} />
      </form>
    </div>
  );
}

export default CheckoutDataUser;
