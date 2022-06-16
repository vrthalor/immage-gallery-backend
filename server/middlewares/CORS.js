//Custom Imports
const config = require('../configuration');

module.exports = (app) =>{
    console.log("inside cors.js")
    app.use((req, res, next) => {
        if(config.get('server.CORS.allowedHosts').indexOf(req.headers.origin).length !== -1){
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Methods', config.get('server.CORS.allowedMethods'));
            res.header('Access-Control-Allow-Headers', config.get('server.CORS.allowedHeaders'));
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Expose-Headers', config.get('server.CORS.exposedHeaders'));

            next();
        }else {
            next ();
        }
    });

    app.options('*', (req, res) =>{
        res.status(200).end();
    })
};