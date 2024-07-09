const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    };

    const { email, password } = req.body;

    try {

        //se valida si el correo ya existe
        let usuario = await Usuario.findOne({email});
        if (usuario) {
            return res.status(400).json({msg: 'El usuario ya existe!'})
        };

        //se crea el usuario
        usuario = new Usuario(req.body);
        usuario.password = await bcryptjs.hash(password, 10)

        //se guarda el usuario en la bd
        await usuario.save();

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
        )


    } catch (error) {
        console.log('Error');
        console.log(error);
        res.status(400).send('Hay un error')
    }

}