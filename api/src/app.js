const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const routes = require('./routes/index.js');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()
// const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// // Authorization middleware. When used, the Access Token must
// // exist and be verified against the Auth0 JSON Web Key Set.
// const checkJwt = auth({
//   audience: 'https://dev-r6cdo8stlhgup2wx.us.auth0.com/api/v2/',
//   issuerBaseURL: `https://dev-r6cdo8stlhgup2wx.us.auth0.com/`,
// });
// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://dev-r6cdo8stlhgup2wx.us.auth0.com/',
//   headers: { authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE' }
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });
// // This route doesn't need authentication
// app.get('/api/public', function (req, res) {
//   res.json({
//     message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
//   });
// });

// // This route needs authentication
// app.get('/api/private', checkJwt, function (req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated to see this.'
//   });
// });

// const checkScopes = requiredScopes('read:messages');

// app.get('/api/private-scoped', checkJwt, checkScopes, function (req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//   });
// });

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
  access_token: ACCESS_TOKEN,
});
require("./db.js");

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //req.body (el objeto contendrá valores de cualquier tipo y no solo cadenas)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/", routes);

//manejador de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
