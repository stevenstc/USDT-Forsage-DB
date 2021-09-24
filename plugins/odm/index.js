"use strict";
const mongoose = require('mongoose');
const glob = require('glob');
const _ = require('lodash');
require('dotenv').config();

class DB {
    constructor(mongoose, models) {
        this.mongoose = mongoose;
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
        return server.plugins['odm']['dbManager'];
    };
};

const getConnection = async function(){
    const options = {
     /*   useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false, 
        useCreateIndex: true,*/
	    /*server: {
	        auto_reconnect: true,
	        reconnectTries: Number.MAX_VALUE,
	        reconnectInterval: 1000,
	    },*/
	    config: {
	        autoIndex: true,
	    },
	}
	
    return await mongoose.connect(process.env.DATABASE_URL, options);
};

const initModels = function(connection, opts){
    return loadModels(opts.directory)
                .then( (models) => applyModelsRelations(models))
                .then( (models) => {
                    //console.log(models);
                    return Promise.resolve(new DB(mongoose, models));
            });
};

const loadModels = function(dir){
	let modelsFiles = getFilesDir(dir, '**/*.model.js');
	
	return new Promise((resolve) => {
        if (!Array.isArray(modelsFiles)) modelsFiles = [modelsFiles];

        return resolve(modelsFiles.reduce((prevVal, file) => {
            let modelsCollection = {};
            let model = require(file)(mongoose);
            let name = file.match(/\/modules\/*\/(.*).model.js/)[1].match(/\/(.*)/)[1];
         //   console.log(name);
            modelsCollection[name] = model;
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

module.exports.register = async function (server, options, next) {
    if (!options) return next('Missing odm plugin options');

    server.decorate('request', 'getDbManager', getDbManager, {apply: true});
    server.decorate('server', 'getDbManager', getDbManager);

    let connection = await getConnection(options);
    let models = initModels(connection, options);
   // console.log(models);
    models.then((db) => {
        server.expose('dbManager', db);
        return next();
    }).catch((err) => {
        return next(err);
    });
};

module.exports.register.attributes = {
    name: 'odm'
};