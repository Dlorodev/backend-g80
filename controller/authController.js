const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    };

    const { email, password } = req.body;

    try {

        //revisar que el usuario este registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe!' })
        };

        //revisar el password
        const passOk = await bcryptjs.compare(password, usuario.password);
        if (!passOk) {
            return res.status(400).json({ msg: 'Contrasenia incorrecta!' })
        };

        //si todo es correcto, se crea y se firma el token

        //firmar el JWT
        const payload = {
            usuario: { id: usuario.id }
        };

        jwt.sign(
            payload, process.env.SECRETA,
            { expiresIn: 3600 },
            (error, token) => {
                if (error) throw error;

                res.json({ token });
            }
        );


    } catch (error) {
        console.log('Error');
        console.log(error);
        res.status(400).send('Hay un error')
    }

};

exports.usuarioAutenticado = async (req, res) => {

    try {

        const usuario = await Usuario.findById(req.usuario.id);
        res.json({ usuario })

    } catch (error) {
        res.status(400).json({ msg: 'Hay un error' })

    }
}