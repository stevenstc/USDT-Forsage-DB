"use strict";
const BaseHandler = require('../core/baseHandler');

class FaqHandler extends BaseHandler{

    constructor(server) {
        super(server, 'faq');
    }
}

module.exports = FaqHandler;