//Internal Imports
const path = require('path');

//External Imports
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

//Custom Imports
const config = require('../configuration');


module.exports = (app, express, root) =>{

    //Enable api key validation
    if(config.get('server.enableApiKeyValidation'))
        require('./apiKeyValidation')(app);

    //compression
    if(config.get('server.enableCompression'))
        app.use(compression());

    //Enable static Directory Path
    if(config.get('server.enableStatic'))
        app.use(express.static(path.join(root, config.get('server.static.directory'))));

    //CORS
    if(config.get('server.enableCORS'))
        require('./CORS')(app); //app.use(cors());

    // Enable request body parsing
    app.use(bodyParser.urlencoded({extended: false, limit: config.get('server.bodyParser.limit')}));

    // Enable request body parsing for json data
    app.use(bodyParser.json({limit: config.get('server.bodyParser.limit')}));

    //
    app.use(cookieParser(config.get('server.session.cookieSecret')));

};