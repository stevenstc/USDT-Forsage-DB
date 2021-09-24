"use strict";
const Joi = require('joi');

module.exports = [	
    {
        method: 'GET',
        path: '/backoffice',
        config: {
            auth: false,
            description: 'Obtener backoffice.',
            notes: ['Retorna un listado de backoffice.'],
            tags: ['api', 'Backoffice'],
            handler: {backofficeHandler: {method: 'getAll'}},
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