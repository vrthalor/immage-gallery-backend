//External Imports
const convict = require('convict');
let config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV",
    },

    server: {
        http: {
            port: {
                doc: 'Start server',
                format: 'port',
                default: 5005,
                env: 'PORT'
            }
        },
        https: {
            privateKey: {
                doc: 'Private key file name',
                format: String,
                default: 'ssl.key'
            },
            certificate: {
                doc: 'Certificate file name',
                format: String,
                default: 'ssl.cert'
            },
            ca_root_cert : {
                doc: 'ca root file name',
                format: String,
                default: 'ca_root.cert'
            }
        },
        bodyParser: {
            limit: {
                doc: 'max req body size',
                format: String,
                default: '100mb'
            }
        },
        enableCompression: {
            doc: 'Enable compression',
            format: Boolean,
            default: true
        },
        enableStatic: {
            doc: 'Enable static',
            format: Boolean,
            default: false
        },
        enableApiKeyValidation: {
            doc: 'Enable Api Key Validation',
            format: Boolean,
            default: false
        },
        enableCORS: {
            doc: 'Enable cors',
            format: Boolean,
            default: true
        },
        security: {
            clientApiKey: {
                doc: 'Client api key',
                format: String,
                default: 'xTdNp-4rtYw82nfr-eUp4@#$-*&^opt9'
            }
        },
        static: {
            directory: {
                doc: 'Express static server content directory',
                format: String,
                default: '../public'
            }
        },
        CORS: {
            allowedHosts: {
                doc: 'Express origin',
                format: Array,
                default: ['http://localhost:3000' ]
            },
            allowedMethods: {
                doc: 'Express req allow methods',
                format: String,
                default: 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            },
            allowedHeaders: {
                doc: 'Express req allow headers',
                format: String,
                default: 'x-api-key , x-local-token, accept, content-type, x-auth-token'
                // default: "Origin, X-Requested-With, Content-Type, Accept"
            },
            exposedHeaders: {
                doc: 'Express req allow exposed headers',
                format: String,
                default: ''
            }
        },
        session: {
            cookieSecret: {
                doc: 'For sliding window of a session',
                format: String,
                default: ""
            }
        },
        JWT: {
            jwtPrivateKey: {
                doc: 'jwt private key',
                format: String,
                default: "app-secret"
            },
            jwtExpiresIn: {
                doc: 'jwt expiration time',
                format: String,
                default: "168h"
            }
        },
    },
 
  
    mongodb: {
        url: {
            doc: "Database url",
            format: String,
            default: "mongodb://103.212.120.24:27017/"
        },
        database: {
            doc: "Database name",
            format: String,
            default: "nits_solutions"
        },
        cloudMongodb: {
            doc: "Database name",
            format: String,
            // default: mongodb://flanceusr:F#rY*56ee4h!98*$@103.231.8.86:27017
            // default: `mongodb://secureGkknowAdmin:${encodeURIComponent('secure@gkknow.2211')}@103.212.120.24:27017/gkknow`
            default: "mongodb://nits:JJ3%#DHs#F7s777sg@103.212.120.24:27017/nits_solutions?retryWrites=true&w=majority"
        }
    },
});

// Load environment dependent configuration
let env = config.get("env");

// config.loadFile(`${__dirname}/${env}.json`);

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;