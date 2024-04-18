const mongoose = require ('mongoose');

const AdminSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        max:255
    },
    lastName: {
        type: String,
        required: true,
        max: 255
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        min: 4
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model('AdminModel', AdminSchema, 'admin')