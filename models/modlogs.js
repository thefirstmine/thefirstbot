// Schema initialize on mongoose
const { Schema, model } = require('mongoose');

module.exports = model('modlogs', new Schema({
        Guild: String,
        Channel: String,
    },{
        collection: 'modlogs'
    })
);