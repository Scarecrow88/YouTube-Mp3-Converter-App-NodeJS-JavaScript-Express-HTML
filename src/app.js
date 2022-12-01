'use strict'
const express = require ('express');
const dotenv = require ('dotenv');
dotenv.config ({
    path: '../.env'
});
let pathRoutes = require ('./routes/index.js');
let pathPublic = express.static (`${__dirname}/public`);
let viewURL = `${__dirname}/views`;
let port = process.env.PORT;
let app = express ();
app
    // Configuracion
    .set ('port', port)
    .set ('views', viewURL)
    .set ('view engine', 'ejs')
    .engine ('html', require ('ejs').renderFile)
    // Middlewares
    .use (express.urlencoded ({
        extended: false
    }))
    .use (express.json ())
    // Rutas
    .use ('/', pathRoutes)
    // Archivos estaticos
    .use (pathPublic)
    .listen (port, () => {
        console.clear ();
        console.log ('Server on port ' + port);
    });