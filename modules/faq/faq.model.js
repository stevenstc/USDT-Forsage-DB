"use strict";
module.exports = function(mongoose) {
    const schema = new mongoose.Schema({
        title: {
            type: String,
			trim: true,
			required: true,
        },
        content: {
            type: String,
			trim: true,
			required: true,
        }
    },{
        collection: "faq"
    });
    return mongoose.model("faq",schema);
};