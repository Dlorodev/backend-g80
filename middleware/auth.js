const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    //leer el token del header
    const token = req.header('x-auth-token');


    //revisar si tenemos token
    if (!token) {
        return res.status(400).json({ msg: 'No hay token, permiso no valido!' })
    };

    //validar el token si lo hay
    try {

        const cifrado = jwt.verify(token, process.env);
        req.usuario = cifrado.usuario;
        next();

    } catch (error) {
        res.status(400).json({ msg: 'Token no valido' })
    }

};