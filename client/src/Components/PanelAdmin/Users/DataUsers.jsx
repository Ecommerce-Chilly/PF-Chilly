import React, { useEffect } from 'react';
import { getDataUser } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import TargetToDataUsers from './TargetToDataUsers';
import OrderItemUser from '../Orders/OrderItemUser';
import { getAllOrders } from '../../../redux/actions/actions';
import { Link } from 'react-router-dom';

function DataUsers() {
  let token = localStorage.getItem('token');
  token = JSON.parse(token);
  const dispatch = useDispatch();
  const { userDataInCheckout, userNotInData, allOrders, userInfo } =
    useSelector((state) => state);
  useEffect(() => {
    dispatch(getDataUser());
    dispatch(getAllOrders(token));
  }, [dispatch]);

  // let myOrders = allOrders?.filter((e) => {
  //   e.id;
  // });

  return (
    <div className="min-h-screen">
      <div className="mb-10 ">
        <h1 className="text-slate-800 text-3xl font-display font-semibold mt-12 ml-60 mb-9">
          Your orders:
        </h1>
        <Link
          to="/user/info"
          className="font-medium text-main ml-60 pb-9 top-44 z-10 border-solid  "
        >
          Back to Profile
        </Link>
      </div>
      {userInfo.order_items.length > 0 ? (
        userInfo.order_items.map((e) => <OrderItemUser key={e.id} {...e} />)
      ) : (
        <div className="w-72 m-auto">
          <svg
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 58 58"
            fill="rgb(56,56,56)"
          >
            <g>
              <g>
                <path
                  d="M53,43.5V27c0-10.201-8.302-18.5-18.506-18.5H23.506C13.302,8.5,5,16.799,5,27v16.5H0v2h6h2h4.05
			c0.252,2.243,2.139,4,4.45,4s4.198-1.757,4.45-4H37.05c0.251,2.243,2.139,4,4.45,4s4.198-1.757,4.45-4H50h2h6v-2H53z M50,43.5h-4
			v-6h-2v6v1.502c0,1.377-1.121,2.498-2.5,2.498S39,46.379,39,45.002V43.5v-6h-2v6H21v-6h-2v6v1.502c0,1.377-1.121,2.498-2.5,2.498
			S14,46.379,14,45.002V43.5v-6h-2v6H8H7V27c0-9.098,7.404-16.5,16.506-16.5h10.988C43.596,10.5,51,17.902,51,27v16.5H50z"
                />
                <path
                  d="M24.192,22.743c-2.341,2.339-6.146,2.337-8.485,0c-0.391-0.391-1.023-0.391-1.414,0c-0.208,0.208-0.297,0.484-0.283,0.757
			H14v5h2v-3.052c1.221,0.693,2.584,1.048,3.949,1.048c2.049,0,4.098-0.78,5.657-2.339c0.391-0.391,0.391-1.023,0-1.414
			S24.583,22.353,24.192,22.743z"
                />
                <path
                  d="M42.192,22.743c-2.341,2.339-6.146,2.337-8.485,0c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414
			c1.56,1.56,3.608,2.339,5.656,2.339c1.038,0,2.076-0.202,3.051-0.603V27.5h2v-2.795c0.209-0.17,0.412-0.353,0.606-0.548
			c0.391-0.391,0.391-1.023,0-1.414C43.216,22.352,42.583,22.353,42.192,22.743z"
                />
                <rect x="14" y="30.5" width="2" height="3" />
                <rect x="41" y="29.5" width="2" height="5" />
              </g>
            </g>
          </svg>
          <h1 className="font-display text-center text-2xl mb-9">
            No orders yet!
          </h1>
        </div>
      )}
      {/* {userDataInCheckout.length > 0 ? (
        userDataInCheckout?.map((e) => <TargetToDataUsers key={e.id} {...e} />)
      ) : (
        <p>{userNotInData} </p>
      )} */}
    </div>
  );
}

export default DataUsers;
