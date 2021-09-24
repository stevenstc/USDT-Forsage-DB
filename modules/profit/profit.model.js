"use strict";
const timestamps = require('mongoose-timestamp');
module.exports = function(mongoose) {
    const schema = new mongoose.Schema({
        userId: {
            type: String,//mongoose.Schema.Types.ObjectId,
          //  ref: 'user',
          //  index: true,
            required: true,
        },
        value: {
            type: Number,
			required: true,
        }
    },{
        collection: "profit"
    });
    
    schema.plugin(timestamps);
    return mongoose.model("profit",schema);
};