"use strict";
const Glue = require('glue');

var config = require('./config/index.js');

var glueManifest = {
    server: {
        debug: { request: ['error'] },
        connections: {routes: {security: true}}
    },
    connections: [{
        host: config.server.host,
        port: config.server.port,
        labels: ['Marina Melfi Api'],
        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['token']
            }
            // auth: false
        }
    }],
    registrations: [
		{ plugin: 'blipp' },
		{ plugin: 'inert' },
		{ plugin: 'vision' },
		{ plugin: { register: './loader', options: config.loaders} },
        { plugin: { register: 'hapi-swagger', options: config.swagger} },
        { plugin: { register: './security' } },
		{ plugin: {
                register: './orm',
                options: {
                    name: config.db.database, // identifier
                    directory: config.loaders.directory,  // paths/globs to model files
                    config: config.db, // sequelize config
                    sync: false, // sync models - default false
                    forceSync: false // force sync (drops tables) - default false,
                }
            }
		}
    ]
};

var glueOptions = {
    relativeTo: `${process.cwd()}/plugins`
};

Glue.compose(glueManifest, glueOptions, (err, server) => {

    if (err) {
        throw err;
    }
	
    server.start(err => {

        if (err) {
            server.log(['error', err], 'Error was handled!');
        }
		
		console.log(`Server running at: ${server.info.uri}`);
    });
});