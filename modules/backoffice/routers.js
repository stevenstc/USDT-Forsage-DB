"use strict";
const Joi = require('joi');

module.exports = [
	{
        method: 'POST',
        path: '/profit/register',
        config: {
            auth: false,
            description: 'Insertar profit.',
            notes: ['Inserta una profit.'],
            tags: ['api', 'Backoffice'],
            handler: {profitHandler: {method: 'create'}},
            validate: {
                payload: Joi.object({
                    user_id: Joi.number().integer().required().description('Usuario'),
                    value: Joi.number().integer().required().description('Valor')
                })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: { description: 'El profit ha sido insertada satisfactoriamente.' },
                        409: { description: 'Conflicto: Existe una profit con los datos especificados.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/profit/{id}/edit',
        config: {
            auth: false,
            description: 'Actualizar profit.',
            notes: ['Actualizar una profit.'],
            tags: ['api', 'Backoffice'],
            handler: {profitHandler: {method: 'update'}},
            validate: {
                payload: Joi.object({
                    user_id: Joi.number().integer().required().description('Usuario'),
                    value: Joi.number().integer().required().description('Valor')
                })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: { description: 'El profit ha sido actualizado satisfactoriamente.' },
                        409: { description: 'Conflicto: Existe una profit con los datos especificados.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/profit/{id}/remove',
        config: {
            auth: false,
            description: 'Eliminar profit.',
            notes: ['Eliminar profit.'],
            tags: ['api', 'Backoffice'],
            handler: {profitHandler: {method: 'remove'}},
            validate: { },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: { description: 'El profit ha sido eliminado satisfactoriamente.' },
                        409: { description: 'Error: No existe un profit con los datos especificados.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/profits',
        config: {
            auth: false,
            description: 'Listar profits.',
            notes: ['Retorna un listado de profits.'],
            tags: ['api', 'Backoffice'],
            handler: {profitHandler: {method: 'getAll'}},
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
        path: '/profit/{id}',
        config: {
            auth: false,
            description: 'Obtener el profit.',
            notes: ['Retorna un profit dado el identificador del usuario.'],
            tags: ['api', 'Backoffice'],
            handler: {profitHandler: {method: 'getProfit'}},
            validate: {
                params: {
                    id: Joi.number().integer().required().description('Identificador del user.')
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