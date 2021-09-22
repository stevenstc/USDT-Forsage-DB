"use strict";
const Joi = require('joi');

module.exports = [
	{
        method: 'POST',
        path: '/faq/register',
        config: {
            auth: false,
            description: 'Insertar faq.',
            notes: ['Inserta una faq.'],
            tags: ['api', 'Faqs'],
            handler: {faqHandler: {method: 'create'}},
            validate: {
                payload: Joi.object({
                    user_id: Joi.number().integer().required().description('Usuario'),
                    value: Joi.number().integer().required().description('Valor')
                })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: { description: 'El faq ha sido insertada satisfactoriamente.' },
                        409: { description: 'Conflicto: Existe una faq con los datos especificados.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/faq/{id}/edit',
        config: {
            auth: false,
            description: 'Actualizar faq.',
            notes: ['Actualizar una faq.'],
            tags: ['api', 'Faqs'],
            handler: {faqHandler: {method: 'update'}},
            validate: {
                payload: Joi.object({
                    user_id: Joi.number().integer().required().description('Usuario'),
                    value: Joi.number().integer().required().description('Valor')
                })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: { description: 'El faq ha sido actualizado satisfactoriamente.' },
                        409: { description: 'Conflicto: Existe una faq con los datos especificados.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/faq/{id}/remove',
        config: {
            auth: false,
            description: 'Eliminar faq.',
            notes: ['Eliminar faq.'],
            tags: ['api', 'Faqs'],
            handler: {faqHandler: {method: 'remove'}},
            validate: { },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: { description: 'El faq ha sido eliminado satisfactoriamente.' },
                        409: { description: 'Error: No existe un faq con los datos especificados.' },
                        500: { description: 'Error interno del servidor.' }
                    }
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/faqs',
        config: {
            auth: false,
            description: 'Listar faqs.',
            notes: ['Retorna un listado de faqs.'],
            tags: ['api', 'Faqs'],
            handler: {faqHandler: {method: 'getAll'}},
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
        path: '/faq/{id}',
        config: {
            auth: false,
            description: 'Obtener el faq.',
            notes: ['Retorna un faq dado el identificador del usuario.'],
            tags: ['api', 'Faqs'],
            handler: {faqHandler: {method: 'getById'}},
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