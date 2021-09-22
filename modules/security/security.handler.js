"use strict";
const BaseHandler = require('../core/baseHandler');
const jwt = require('jsonwebtoken');

class SecurityHandler extends BaseHandler {

	constructor(server) {
		super(server, 'user');
	}

	login(request, reply) {
		let email = request.payload.email;
		let password = request.payload.password;

		this.getModel().findOne({ where: { correo: email, contrasenna: password } }).then(client => {

			if (client && parseInt(client.get('estado')) === 1) {

				this.getModelByName('conf_adminportal').findOne().then(dataconfestructura => {

					if (parseInt(client.get('rol')) !== 2 && !dataconfestructura) {
						reply().code(410);
					}
					else {
						let tokenData = {
							iduser: client.get('idsolicitud'),
							nombre: client.get('nombre'),
							codigopostal: client.get('codigopostal'),
							telefono: client.get('telefono'),
							direccion: client.get('direccion'),
							estado: client.get('estado'),
							idclienteproveedor: client.get('idclienteproveedor'),
							rol: client.get('rol'),
							estructura: (dataconfestructura) ? dataconfestructura.get('idestructura') : null
						};

						let token = jwt.sign(tokenData, process.env.JWTKey, { algorithm: 'HS256', /*expiresIn: "1h"*/ });

						reply({ id_token: token }).code(201);
					}
				});
			}
			else if (client && (parseInt(client.get('estado')) === 2 || client.get('estado') == null)) {
				reply().code(408);
			}
			else {
				reply().code(409);
			}

		});
	}
	
	register(request, reply) {
		let email = request.payload.email;
		let password = request.payload.password;

		this.getModel().findOne({ where: { correo: email, contrasenna: password } }).then(client => {

			if (client && parseInt(client.get('estado')) === 1) {

				this.getModelByName('conf_adminportal').findOne().then(dataconfestructura => {

					if (parseInt(client.get('rol')) !== 2 && !dataconfestructura) {
						reply().code(410);
					}
					else {
						let tokenData = {
							iduser: client.get('idsolicitud'),
							nombre: client.get('nombre'),
							codigopostal: client.get('codigopostal'),
							telefono: client.get('telefono'),
							direccion: client.get('direccion'),
							estado: client.get('estado'),
							idclienteproveedor: client.get('idclienteproveedor'),
							rol: client.get('rol'),
							estructura: (dataconfestructura) ? dataconfestructura.get('idestructura') : null
						};

						let token = jwt.sign(tokenData, process.env.JWTKey, { algorithm: 'HS256', /*expiresIn: "1h"*/ });

						reply({ id_token: token }).code(201);
					}
				});
			}
			else if (client && (parseInt(client.get('estado')) === 2 || client.get('estado') == null)) {
				reply().code(408);
			}
			else {
				reply().code(409);
			}

		});
	}
}

module.exports = SecurityHandler;