const mongoose = require('mongoose');

//el modelo que se va a implementar debe ser igual al de la base de datos
const clienteSchema = mongoose.Schema({
    nombres:{
        type: String,
        required: true
    },

    apellidos:{
        type: String,
        required: true
    },

    cedula:{
        type: Number,
        required: true
    },

    correo:{
        type: String,
        required: true
    },

    numeroContacto:{
        type: Number,
        required: true
    },

    nit:{
        type: Number,
        required: true
    },

    direccion:{
        type: String,
        required: true
    }
}, {versionkey: false});

module.exports = mongoose.model('Cliente', clienteSchema);