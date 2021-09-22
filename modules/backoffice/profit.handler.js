"use strict";
const BaseHandler = require('../core/baseHandler');

class ProfitHandler extends BaseHandler{

    constructor(server) {
        super(server, 'profit');
    }

    getAll (request, reply) {
        this.getModel().findAll().then( (records)=>{
            let data = new Array();

            records.forEach(function(record){
                data.push({
                    id: record.get('id'),
                    user_id: record.get('user_id'),
                    value: record.get('value')
                })
            }, this);

            reply({ data: data});
        });
	}
    
    insert(request, reply) {
        let params = request.payload;

        this.getModel().findOrCreate({
            where: { user_id: params.user_id },
            defaults: {
                user_id: params.user_id,
                value : params.value
            }
        }).spread((record, create) => {

            if (create)
                return reply({ code: 1, data: record.get({ plain: true }) }).created();

            return reply({ code: 2, msg: 'Profit registrado' }).code(409);
        });
    }
}

module.exports = ProfitHandler;