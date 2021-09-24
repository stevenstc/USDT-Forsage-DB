"use strict";
const pkgJson = require('../package.json');
require('dotenv').config();
const server = {
	host: 'localhost',
	port: '3001'
};

module.exports = {
	server: {
		host: server.host,
		port: server.port
	},
	loaders: {
		directory: "/modules"
	},
	securityDefinitions: {
		'jwt': {
			'type': 'apiKey',
			'name': 'Authorization',
			'in': 'header'
		}
	},
	swagger: {
		host: server.host + ':' + server.port,
		info: {
			title: "Monopoly Api",
			description: "Api de servicios del portal de Monopoly",
			version: pkgJson.version,
			contact: {
				name: "Freelance"
			}
		},
		documentationPath: "/docs",
		lang: "es",
		grouping: "tags",
		tags: [
			{ name: "Security" },
			{ name: "Backoffice" },
			{ name: "Profit" },
			{ name: "Faqs" }
		],
		securityDefinitions: {
			'jwt': {
				type: 'apiKey',
				name: 'Authorization',
				in: 'header'
			}
		},
		security: [{ 'jwt': [] }]
		// auth: false
	},
	security: [{ 'jwt': [] }],
	auth: false
};