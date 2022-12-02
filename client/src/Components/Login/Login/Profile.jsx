import React, { useEffect, useState } from "react";
import axios from "axios";
import { LocalStorageCache, useAuth0 } from "@auth0/auth0-react";
import * as actions from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
const Profile = () => {
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
      dispatch(actions.createUser({ email: user.email }, token));
      localStorage.setItem("token", JSON.stringify(token));
    };
    postDb();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};

export default Profile;
