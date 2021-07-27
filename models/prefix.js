// Schema initialize on mongoose
const { Schema, model } = require('mongoose');

module.exports = model('prefix', new Schema({
        guildID: String,
        prefix: String,
    },{
        collection: 'datas'
    })
);