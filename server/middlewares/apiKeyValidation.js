//Custom Imports
const constants = require('../utils/constants');
const config = require('../configuration');


module.exports = (app) =>{
    app.use((req, res, next) =>{

        const clientApiKey = req.header("x-api-key");

        if(clientApiKey){
            if(clientApiKey === config.get('server.security.clientApiKey')){

                next();

            } else {

                return res.status(constants.UNAUTHORIZED.code).json({
                    error: true,
                    code: constants.UNAUTHORIZED.code,
                    message: 'Invalid api Key.',
                    data: null
                })
            }

        }else {

            return res.status(constants.UNAUTHORIZED.code).json({
                error: true,
                code: constants.UNAUTHORIZED.code,
                message: 'Access denied. No api key provided.',
                data: null
            })
        }
    })
};