const mongoose = require('mongoose');

const { Schema } = mongoose;

const chapModel = new Schema({
                 username:{ type: String },
                 password: { type: String },
                 email: { type: String }
});

module.exports = mongoose.model('Chap', chapModel)