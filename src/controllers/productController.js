const Product = require('../models/Product');

// Obtener todos los productos
const getProducts = async (req, res) => {

    try {

        const productos = await Product.find();

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

// Crear producto
const createProduct = async (req, res) => {

    try {

        const {
            nombre,
            descripcion,
            clasificacion,
            precio,
            stock
        } = req.body;

        const producto = new Product({
            nombre,
            descripcion,
            clasificacion,
            precio,
            stock
        });

        await producto.save();

        res.status(201).json(producto);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

// Actualizar producto
const updateProduct = async (req, res) => {

    try {

        const producto = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

// Eliminar producto
const deleteProduct = async (req, res) => {

    try {

        const producto = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto eliminado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};