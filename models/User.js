const { model, Schema, Types } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    about_me: { type: String },
    type: { type: String, required: true, default: 'workman' },
    profession: { type: String },
    education: { type: String },
    experience: { type: String },
    salary: { type: String },
    contacts: { type: String },
    looking_job: { type: Boolean, required: true, default: false },
    links_time_receipt: [{ type: Types.ObjectId, ref: 'Reception_unemployed' }],
    links_vacancy: [{ type: Types.ObjectId, ref: 'Vacancy' }],
    links_created_vacancies: [{ type: Types.ObjectId, ref: 'Vacancy' }],
    links_company: [{ type: Types.ObjectId, ref: 'User' }],
    links_employee: [{ type: Types.ObjectId, ref: 'User' }]
})

module.exports = model('User', schema)