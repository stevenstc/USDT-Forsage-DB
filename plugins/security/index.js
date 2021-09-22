"use strict";
const jwt = require('hapi-auth-jwt2');

process.env.JWTKey = 'api_key';

const validateAccess = (decoded, request, callback) => {
    let routerId = request.route.settings.id;
    let isRestrictedRouter = config.get("/application/adminroutes").indexOf(routerId) != -1 ;

    if(!decoded.isadmin && isRestrictedRouter)
        return callback(null, false);

    //Puedes verlos en el handler con console.log(request.auth.credentials);
    return  callback(null, true, decoded);
};

module.exports.register = function (server, options, next) {
    server.register(jwt, function(error){
        if (error) { return next(error); }

        server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWTKey,
            validateFunc: validateAccess,
            verifyOptions: {algorithms: [ 'HS256' ]}
        });

        server.auth.default('jwt');

        return next();
    });
};

module.exports.register.attributes = {
    name: 'security'
};