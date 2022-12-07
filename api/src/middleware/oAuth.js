const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://chillydev-arg/api/v1/',
  issuerBaseURL: `https://dev-r6cdo8stlhgup2wx.us.auth0.com/`,
});
const checkScopes = requiredScopes('admin:ReAdminPa');


module.exports = { checkJwt, checkScopes }