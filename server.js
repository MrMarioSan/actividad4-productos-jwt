require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const connectDB = require('./src/config/db');

connectDB();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/productos', require('./src/routes/productRoutes'));

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de Productos con JWT funcionando'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});