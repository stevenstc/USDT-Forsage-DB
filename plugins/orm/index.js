"use strict";
const Sequelize = require('sequelize');
const glob = require('glob');
const _ = require('lodash');

class DB {
    constructor(sequelize, models) {
        this.sequelize = sequelize;
        this.models = models;
    }

    getModel(name) {
        return this.models.hasOwnProperty(name) ? this.models[name] : null;
    }

    setRepository(){
        let model = this.getModel

    }

    getModels() {
        return this.models;
    }
}

const getDbManager = (request) => {
    return function getDbManager() {
        let server = (request)? request.server : this;
        return server.plugins['orm']['dbManager'];
    };
};

const getConnection = function(opts){
    return new Sequelize( opts.config.database, opts.config.username, opts.config.password, opts.config );
};

const initModels = function(connection, opts){

    return connection.authenticate().then(() => {
		return loadModels(opts.directory, connection.import.bind(connection))
                .then( (models) => applyModelsRelations(models))
                .then( (models) => {
                    if (opts.sync) {
                        return connection.sync({force: opts.forceSync})
                            .then(() => Promise.resolve(new DB(connection, models)));
                    } else {
                        return Promise.resolve(new DB(connection, models));
                    }
                });
    });
	
};

const loadModels = function(dir, importFn){
	let modelsFiles = getFilesDir(dir, '**/*.model.js');
	
	return new Promise((resolve) => {
        if (!Array.isArray(modelsFiles)) modelsFiles = [modelsFiles];

        return resolve(modelsFiles.reduce((prevVal, file) => {
            let modelsCollection = {};
            let model = importFn(file);
            modelsCollection[model.name] = model;
            return Object.assign({}, prevVal, modelsCollection);
        }, {}));
    });
	
}

const getFilesDir = (dir, pattern) => {
    let searchDir = `${process.cwd()}${dir}`,
        filesNames = glob.sync(pattern, {cwd: searchDir});//'**/*.js'

    return _.map(filesNames, (file) => {
        return `${searchDir}/${file}`;
    });
};

const applyModelsRelations = function(models){
    return new Promise((resolve) => {
        if (!models || typeof models !== 'object')
            throw new Error('Can\'t apply relationships on invalid models object');

        Object.keys(models).forEach((name) => {
            if (models[name].hasOwnProperty('associate')) {
                models[name].associate(models);
            }
        });

        return resolve(models);
    });
}

module.exports.register = function (server, options, next) {
    if (!options) return next('Missing orm plugin options');

    server.decorate('request', 'getDbManager', getDbManager, {apply: true});
    server.decorate('server', 'getDbManager', getDbManager);

    let connection = getConnection(options);
    let models = initModels(connection, options);

    models.then((db) => {
        server.expose('dbManager', db);
        return next();
    }).catch((err) => {
        return next(err);
    });
};

module.exports.register.attributes = {
    name: 'orm'
};