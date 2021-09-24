"use strict";
const timestamps = require('mongoose-timestamp');
module.exports = function(mongoose) {
    const schema = new mongoose.Schema({        
        name: {
            type: String,
			trim: true,
			required: true,
        },
        lastname: {
            type: String,
			trim: true,
			required: true,
        },
    },{
        collection: "user"
    });
    
    schema.plugin(timestamps);
    return mongoose.model("user",schema);
};