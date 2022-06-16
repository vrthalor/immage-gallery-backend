//Internal Imports
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const express = require('express');
const config = require('./configuration');

let server;
let app = express();

require("./utils/common");
app.use("/public", express.static("public"));

if (config.get("env") === 'production') {
    // server = https.createServer(options, app);
} else {
    server = http.createServer(app);
}


//middleware
require('./middlewares')(app, express, __dirname);

require('./mongodb');
//routes
require('./routes')(app);
//cron

app.set('port', config.get('server.http.port'));

// const staticPath = path.join(__dirname, '../views')
const staticPath2 = path.join(__dirname, '../images')

// app.use(express.static(staticPath))
app.use(express.static(staticPath2))

// app.use(express.static('../images'))
app.set("view engine", "hbs");


//
server.listen(app.get('port'), () => {
    console.info(`Express server listening on PORT: ${app.get('port')}`)
});

module.exports = app;