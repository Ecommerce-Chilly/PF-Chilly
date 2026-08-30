const { auth } = require('express-oauth2-jwt-bearer');
const { hasPermission } = require('./permissions');
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});
const adminPermission = process.env.AUTH0_ADMIN_SCOPE || 'admin:access';

function checkScopes(req, res, next) {
  if (hasPermission(req.auth?.payload, adminPermission)) return next();

  return res.status(403).send({ error: 'Insufficient permissions' });
}

module.exports = { checkJwt, checkScopes };
