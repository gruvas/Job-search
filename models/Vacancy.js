const { model, Schema, Types } = require('mongoose')

const schema = new Schema({
    name_organization: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String},
    salary: {type: Number},
    contacts: {type: String},
    experience: {type: String},
    employment: {type: String},
    description: {type: String},
    responsibilities: {type: String},
    requirements: {type: String},
    terms: {type: String},
    status: {type: Boolean, default: false},
    links_user: [{type: Types.ObjectId, ref: 'User'}],
    links_creator: [{type: Types.ObjectId, ref: 'User'}]
})

module.exports = model('Vacancy', schema)