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
            tags: ['api', 'Profit'],
            handler: {profitHandler: {method: 'create'}},
            validate: {
                payload: Joi.object({
                    userId: Joi.string().required().description('Usuario'),
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
            tags: ['api', 'Profit'],
            handler: {profitHandler: {method: 'update'}},
            validate: {
                params: {
                    id: Joi.string().required().description('Identificador.')
                },
                payload: Joi.object({
                    userId: Joi.string().required().description('Usuario'),
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
            tags: ['api', 'Profit'],
            handler: {profitHandler: {method: 'remove'}},
            validate: {  
                params: {
                    id: Joi.string().required().description('Identificador.')
                }
            },
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
            tags: ['api', 'Profit'],
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
            tags: ['api', 'Profit'],
            handler: {profitHandler: {method: 'getById'}},
            validate: {
                params: {
                    id: Joi.string().required().description('Identificador del user.')
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