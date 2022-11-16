const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //req.body (el objeto contendrá valores de cualquier tipo y no solo cadenas)

app.use('/', routes);

//manejador de errores
app.use((err, req, res, next) => { 
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = app;