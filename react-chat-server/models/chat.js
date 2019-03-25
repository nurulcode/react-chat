var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Phone = new Schema({
    id: String,
    name: String,
    message: String
})

module.exports = mongoose.model('Phone', Phone);
