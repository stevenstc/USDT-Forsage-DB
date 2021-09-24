"use strict";
const BaseHandler = require('../core/baseHandler');

class ProfitHandler extends BaseHandler{

    constructor(server) {
        super(server, 'profit');
    }
}

module.exports = ProfitHandler;