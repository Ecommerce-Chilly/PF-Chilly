import React, { useEffect, useState } from "react";
import{useAuth0} from '@auth0/auth0-react'

const Profile = ()=>{

    const{user,isAuthenticated,getAccessTokenSilently}= useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "dev-r6cdo8stlhgup2wx.us.auth0.com";
      
          try {
            const accessToken = await getAccessTokenSilently({
              audience: `https://${domain}/api/v1/`,
              scope: "read:client_grants create: create_product",
            });
            console.log(accessToken)
            const userDetailsByIdUrl = `https://${domain}/api/v1/users/${user.sub}`;
            console.log(userDetailsByIdUrl)
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
      
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);
    return (
     isAuthenticated &&  (
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
    )

    
}

export default Profile;




























