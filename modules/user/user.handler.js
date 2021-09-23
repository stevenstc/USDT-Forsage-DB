"use strict";
const BaseHandler = require('../core/baseHandler');

class UserHandler extends BaseHandler{

    constructor(server) {
        super(server, 'user');
    }

    getAll (request, reply) {
        this.getModel().findAll().then( (records)=>{
            let data = new Array();

            records.forEach(function(record){
                data.push({
                    id: record.get('id'),
                    name: record.get('name'),
                    lastname: record.get('lastname'),
                    createAt: record.get('createAt'),
                    updateAt: record.get('updateAt')
                })
            }, this);

            reply({ data: data});
        });
	}
    
    insert(request, reply) {
        let params = request.payload;

        this.getModel().findOrCreate({
            defaults: {
                name: params.name,
                lastname : params.lastname
            }
        }).spread((record, create) => {

            if (create)
                return reply({ code: 1, data: record.get({ plain: true }) }).created();

            return reply({ code: 2, msg: 'User registrado' }).code(409);
        });
    }
}

module.exports = UserHandler;