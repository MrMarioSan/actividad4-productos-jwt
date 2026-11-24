const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            mensaje: 'Acceso denegado. No se proporcionó token.'
        });
    }

    try {

        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            mensaje: 'Token inválido'
        });

    }
};

module.exports = authMiddleware;