const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    email: {
        type: String,
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    nome: {
        type: String,
        required: true
    },
    telemovel: {
        type: String,
        required: true, 
        unique: true
    },
    localizacao: {
        type: String,
        required: true
    },
    nib: {
        type: String,
        required: true, 
        unique: true
    }
});


module.exports = mongoose.model('Cliente', clienteSchema);