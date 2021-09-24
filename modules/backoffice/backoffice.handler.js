"use strict";

const moment = require('moment');
const { Op } = require("sequelize");
const BaseHandler = require('../core/baseHandler');

class BackOfficeHandler extends BaseHandler{

    constructor(server) {
        super(server, 'profit');
    }
    getAll = async (request, reply) => {
        const day = moment().add(-1, 'days').format("YYYY-MM-D h:mm:ss");
        try {
            const participants = await this.getModelByName('user').count();
            const profits = await this.getModel().aggregate().group({ _id: null,total: { $sum: '$value' } });
            const participants24 = await this.getModelByName('user').find({ createdAt:{$gte:day} }).count();
            const profits24x = await this.getModel().find({ createdAt:{$gte:day} });
            let profits24 = 0; 
            profits24x.forEach((n) => {
                profits24 += n.value;
            });
            return reply({ 
                data: {
                    participants : participants,
                    participants24 : participants24,
                    profits: profits.length > 0 ? profits[0].total : 0 ,
                    profits24 : profits24 
                }
            });
        } catch (error) {
        return reply({ code: 2, msg: error.message }).code(500);
        }
   };
}

module.exports = BackOfficeHandler;