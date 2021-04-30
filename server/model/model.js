const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    id_karyawan : {
        type : String,
        required: true,
        unique: true
    },
    posisi : {
        type: String,
        required: true,
    },
    gender : String,
    status : String
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;