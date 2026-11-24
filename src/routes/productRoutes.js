const express = require('express');

const router = express.Router();

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const authMiddleware =
    require('../middleware/authMiddleware');

// Obtener productos
router.get('/', authMiddleware, getProducts);

// Crear producto
router.post('/', authMiddleware, createProduct);

// Actualizar producto
router.put('/:id', authMiddleware, updateProduct);

// Eliminar producto
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;