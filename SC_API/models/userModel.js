const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
                 firstname:{ type: String },
                 lastname: { type: String },
                 username: { type: String },
                 password: { type: String },
                 dob: {type: String},
                 gender: { type: String },
                 email: { type: String },
                 height:{ type: String },
                 weight: { type: String },
                 bodyType: { type: String },
                 age: { type: Number },
                 preference: String,
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

module.exports = mongoose.model('User', userModel)