import React, { useEffect, useState } from "react";
import axios from "axios";
import { LocalStorageCache, useAuth0 } from "@auth0/auth0-react";
import * as actions from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import {
  localStorageToCart,
  updateCartQuantity,
} from "../../../redux/actions/actions";

const Profile = () => {
  const { admin, userInfo } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-r6cdo8stlhgup2wx.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v1/`,
          scope: "read:client_grants",
        });
        const userDetailsByIdUrl = `https://${domain}/api/v1/users/${user.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
    const postDb = async () => {
      await getUserMetadata();
      localStorage.setItem("email", JSON.stringify(user.email));
      const token = await getAccessTokenSilently();
      localStorage.setItem("token", JSON.stringify(token));
      async function create() {
        const token = await getAccessTokenSilently();
        await dispatch(
          actions.createUser(
            {
              id: user.id,
              email: user.email,
              img: user.picture,
              name: user.name,
            },
            token
          )
        );
        await dispatch(actions.userSpecific(user.email, token));
        await dispatch(actions.userAdmin(user.email, token));
        await dispatch(actions.getCartFromBack(userInfo.id));
      }
      create();
    };
    postDb();
  }, [getAccessTokenSilently, user?.sub]);

  React.useEffect(() => {
    let cartLS = window.localStorage.getItem("cart");
    if (cartLS) {
      dispatch(localStorageToCart(JSON.parse(cartLS)));
      window.localStorage.removeItem("cart");
      dispatch(updateCartQuantity(userInfo.id));
    }
  }, []);

  return (
    isAuthenticated && (
      <div>
        <h2 className="text-slate-800 text-3xl font-display font-semibold mt-12 ml-60 mb-9">
          User profile
        </h2>
        <div class="flex min-h-screen -mt-36  items-center justify-center m-4">
          <div class="w-full rounded-lg p-12 shadow-xl  md:w-8/12 lg:w-6/12 bg-white border">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 relative">
              <div class="grid-cols-1 lg:col-span-3">
                <div class="mx-auto flex h-[90px]  items-center justify-center rounded-full p-4">
                  <img
                    class=" rounded-full"
                    src={user.picture}
                    alt={user.name}
                  />
                </div>
              </div>

              <div class="col-span-1 lg:col-span-9 ">
                <div class="text-center lg:text-left">
                  <h2 class="text-2xl font-bold text-zinc-700">User info</h2>
                  <p class="mt-2 font-semibold text-zinc-700">
                    Name: {user.name}
                  </p>
                  <p class="mt-2 font-semibold text-zinc-700">
                    Email: {user.email}
                  </p>
                </div>

                <div class="w-1/2 mt-9 mx-5">
                  <LogoutButton />
                </div>
              </div>
              <div className="absolute right-0 text-slate-800 text-center">
                {admin === true ? (
                  <>
                    <p>★ ADMIN ★ </p>
                    <Link to="/panel+admin" className="text-main">
                      Panel Admin
                    </Link>
                    <p>★ ORDERS ★ </p>
                    <Link to="/data+orders" className="text-main">
                      My Orders
                    </Link>
                  </>
                ) : (
                  <>
                    <p>★ ORDERS ★ </p>
                    <Link to="/data+orders" className="text-main">
                      My Orders
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
