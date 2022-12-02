import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
const Page = () => (
  <>
    <p>Hola</p>
  </>
);

export default withAuthenticationRequired(Page, {
  onRedirecting: () => (
    <>
      <p>redirigiendo pa </p>
    </>
  ),
});
