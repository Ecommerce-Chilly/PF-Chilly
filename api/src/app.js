const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/index.js');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// SDK de Mercado Pago
const mercadopago = require('mercadopago');
// Agrega credenciales
const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
  access_token: ACCESS_TOKEN,
});
require('./db.js');

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //req.body (el objeto contendrá valores de cualquier tipo y no solo cadenas)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from http:localhost:3001
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', routes);

//manejador de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
