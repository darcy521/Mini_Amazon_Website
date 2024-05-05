const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    _id: String,
    any: mongoose.Schema.Types.Mixed
}, { _id: true });

const Session = mongoose.model('sessions', Schema);

module.exports = Session;