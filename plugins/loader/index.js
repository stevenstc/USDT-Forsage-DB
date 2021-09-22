"use strict";
const glob = require('glob');
const _ = require('lodash');
const path = require('path');
const camelCase = require('camelcase');

const getFilesDir = (dir, pattern) => {
    let searchDir = `${process.cwd()}${dir}`,
        filesNames = glob.sync(pattern, {cwd: searchDir});//'**/*.js'

    return _.map(filesNames, (file) => {
        return `${searchDir}/${file}`;
    });
};

const resgisterHandlers = (server, dir) => {
    _.map(getFilesDir(dir, '**/*.handler.js'), (handlerdir) => {

        const classFunction = require(handlerdir);
        let handlerClass = new classFunction(server);
        const handlerName = camelCase(path.basename(handlerdir).replace(/.js/, ''));
		
        server.handler(handlerName, handlerClass.dispatch.bind(handlerClass));
    });
};

const getRoutesConfig = (dir) => {
    let routesConfig = new Array();
	
    _.map(getFilesDir(dir, '**/routers.js'), (routerdir) => {
        routesConfig = routesConfig.concat( require(routerdir) );
    });

    return routesConfig;
};

module.exports.register = function (server, options, next) {
	if (!options) return next('Missing loader plugin options');
	
	resgisterHandlers(server, options.directory);
	server.route(getRoutesConfig(options.directory));
	
    next();
};

module.exports.register.attributes = {
    pkg: require('../../package.json')
};