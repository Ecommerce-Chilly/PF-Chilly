import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Hola from "./Hola";
export default withAuthenticationRequired(Hola, {
  onRedirecting: () => (
    <>
      <p>redirigiendo pa </p>
    </>
  ),
});
