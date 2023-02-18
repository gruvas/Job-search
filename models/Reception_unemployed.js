const { model, Schema, Types } = require('mongoose')

const schema = new Schema({
    date: { type: Date },
    employee: [{ type: Types.ObjectId, ref: 'User' }],
    unemployed: [{ type: Types.ObjectId, ref: 'User' }]
})

module.exports = model('Reception_unemployed', schema)