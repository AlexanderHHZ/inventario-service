const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const productoRoutes = require('./routes/producto.routes');
const swaggerSpec = require('./config/swagger');

const {
    rutaNoEncontrada,
    manejarErrores
} = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares generales
app.use(cors());
app.use(express.json());


// Documentación Swagger
app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


// Health check
app.get('/api/health', (req, res) => {
    return res.status(200).json({
        success: true,
        service: 'inventario-service',
        message: 'Servicio de inventario funcionando correctamente'
    });
});


// Rutas de productos
app.use('/api/productos', productoRoutes);


// Ruta no encontrada
// IMPORTANTE: debe ir después de las rutas existentes.
app.use(rutaNoEncontrada);


// Manejador general de errores
// IMPORTANTE: debe ser el último middleware.
app.use(manejarErrores);


app.listen(PORT, () => {
    console.log(
        `Servidor de inventario ejecutándose en http://localhost:${PORT}`
    );

    console.log(
        `Documentación disponible en http://localhost:${PORT}/api/docs`
    );
});