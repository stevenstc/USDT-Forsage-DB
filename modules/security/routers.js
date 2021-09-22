"use strict";
const Joi = require('joi');

module.exports = [
	{
        method: 'POST',
        path: '/login',
        config: {
            auth: false,
            description: 'Autenticarse en el portal.',
            notes: ['Autenticarse en el portal con el username y la contraseña.'],
            tags: ['api', 'Security'],
            handler: {securityHandler: {method: 'login'}},
            validate: {
                payload: Joi.object({
                        username: Joi.string().required().description('Usuario'),
                        password: Joi.string().required().description('Contraseña')
                    })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: { description: 'El usuario se ha autenticado.' },
                        408: { description: 'Su solicitud como usuario no ha sido confirmada.' },
                        409: { description: 'El correo o la contraseña son incorrectos.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/register',
        config: {
            auth: false,
            description: 'Insertar usuario.',
            notes: ['Inserta un usuario.'],
            tags: ['api', 'Security'],
            handler: {securityHandler: {method: 'register'}},
            validate: {
                payload: Joi.object({
                    username: Joi.string().required().description('Username/Correo'),
                    password: Joi.string().required().description('Contraseña')
                })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: { description: 'El usuario ha sido registrado satisfactoriamente.' },
                        409: { description: 'Conflicto: Existe un usuario con los datos especificados.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
];