const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
{
    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    clasificacion: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
