const mongoose = require('mongoose');


const UsuariosSchema = mongoose.Schema({
    nombre: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    registro: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);