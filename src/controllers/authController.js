const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
const register = async (req, res) => {
    try {

        const { nombre, email, password, pais } = req.body;

        const existeUsuario = await User.findOne({ email });

        if (existeUsuario) {
            return res.status(400).json({
                mensaje: 'El usuario ya existe'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const usuario = new User({
            nombre,
            email,
            password: passwordHash,
            pais
        });

        await usuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

// Login
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        const passwordValido =
            await bcrypt.compare(password, usuario.password);

        if (!passwordValido) {
            return res.status(400).json({
                mensaje: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.json({
            token
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

module.exports = {
    register,
    login
};