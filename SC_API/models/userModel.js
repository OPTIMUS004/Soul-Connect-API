const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const { Schema } = mongoose;

const userModel = new Schema({
                 firstname:{ type: String },
                 lastname: { type: String },
                 username: { type: String, required: true, unique: true },
                 password: { type: String, required: true },
                 dob: {type: String},
                 gender: { type: String },
                 email: { type: String, required: true, unique: true },
                 height:{ type: String },
                 weight: { type: String },
                 bodyType: { type: String },
                 age: { type: Number },
                 preference: {type: String},
                 rStatus: { type: String },
                 genotype: { type: String },
                 bloodGroup: { type: String },
                 kids: { type: String },
                 educationLevel: { type: String },
                 ethnicity: { type: String },
                 sect: { type: String },
                 workStatus: { type: Object },
                 favorite: { type: Array },
                 proposals: { type: Array },
                 aboutYou: { type: String },
                 expectancy: {type: String },
                 outlook: { type: String }
});

userModel.plugin(uniqueValidator);

module.exports = mongoose.model('User', userModel)