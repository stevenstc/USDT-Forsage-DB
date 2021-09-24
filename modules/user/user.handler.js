"use strict";
const BaseHandler = require('../core/baseHandler');

class UserHandler extends BaseHandler{

    constructor(server) {
        super(server, 'user');
    }
}

module.exports = UserHandler;