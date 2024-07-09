const mongoose = require('mongoose');

const proveedorSchema = mongoose.Schema({
    nombreEmpresa: {
        type: String,
        require: true
    },

    nit: {
        type: Number,
        require: true
    },

    numeroContacto: {
        type: Number,
        require: true
    },

    correo: {
        type: String,
        require: true
    },

    direccionFactura: {
        type: String,
        require: true
    }
}, {versionkey: false});

module.exports = mongoose.model('Proveedor', proveedorSchema);
