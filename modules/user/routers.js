"use strict";
const Joi = require('joi');

module.exports = [
	{
        method: 'POST',
        path: '/user/register',
        config: {
            auth: false,
            description: 'Insertar user.',
            notes: ['Inserta una user.'],
            tags: ['api', 'User'],
            handler: {userHandler: {method: 'create'}},
            validate: {
                payload: Joi.object({
                    name: Joi.string().required().description('Nombre'),
                    lastname: Joi.string().required().description('Apellidos')
                })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: { description: 'El user ha sido insertada satisfactoriamente.' },
                        409: { description: 'Conflicto: Existe una user con los datos especificados.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/user/{id}/edit',
        config: {
            auth: false,
            description: 'Actualizar user.',
            notes: ['Actualizar un user.'],
            tags: ['api', 'User'],
            handler: {userHandler: {method: 'update'}},
            validate: {
                payload: Joi.object({
                    name: Joi.string().required().description('Nombre'),
                    lastname: Joi.string().required().description('Apellidos')
                })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: { description: 'El user ha sido actualizado satisfactoriamente.' },
                        409: { description: 'Conflicto: Existe una user con los datos especificados.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/user/{id}/remove',
        config: {
            auth: false,
            description: 'Eliminar user.',
            notes: ['Eliminar user.'],
            tags: ['api', 'User'],
            handler: {userHandler: {method: 'remove'}},
            validate: { },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: { description: 'El user ha sido eliminado satisfactoriamente.' },
                        409: { description: 'Error: No existe un user con los datos especificados.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/users',
        config: {
            auth: false,
            description: 'Listar users.',
            notes: ['Retorna un listado de users.'],
            tags: ['api', 'User'],
            handler: {userHandler: {method: 'getAll'}},
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: { description: 'Todo funciona correctamente.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/user/{id}',
        config: {
            auth: false,
            description: 'Obtener el user.',
            notes: ['Retorna un user dado el identificador del usuario.'],
            tags: ['api', 'User'],
            handler: {userHandler: {method: 'getById'}},
            validate: {
                params: {
                    id: Joi.number().integer().required().description('Identificador.')
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: { description: 'Todo funciona correctamente.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    }
];