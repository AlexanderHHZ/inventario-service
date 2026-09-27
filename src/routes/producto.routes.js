const express = require('express');
const router = express.Router();

const {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/producto.controller');

const {
    validarId,
    validarProducto
} = require('../middlewares/validarProducto');


/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Consultar todos los productos
 *     description: Obtiene la lista completa de productos registrados en el inventario.
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lista de productos
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Producto'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', obtenerProductos);


/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Consultar un producto por ID
 *     description: Obtiene la información de un producto específico utilizando su ID.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: Producto encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Producto encontrado
 *                 data:
 *                   $ref: '#/components/schemas/Producto'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get(
    '/:id',
    validarId,
    obtenerProductoPorId
);


/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Registrar un nuevo producto
 *     description: Registra un nuevo producto en el inventario.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoEntrada'
 *     responses:
 *       201:
 *         description: Producto registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Producto registrado correctamente
 *                 data:
 *                   $ref: '#/components/schemas/Producto'
 *       400:
 *         description: Datos inválidos o proveedor inexistente
 *       500:
 *         description: Error interno del servidor
 */
router.post(
    '/',
    validarProducto,
    crearProducto
);


/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Actualiza los datos de un producto existente utilizando su ID.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto que se desea actualizar
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoEntrada'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Producto actualizado correctamente
 *                 data:
 *                   $ref: '#/components/schemas/Producto'
 *       400:
 *         description: ID o datos inválidos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put(
    '/:id',
    validarId,
    validarProducto,
    actualizarProducto
);


/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto del inventario utilizando su ID.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto que se desea eliminar
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Producto eliminado correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete(
    '/:id',
    validarId,
    eliminarProducto
);


module.exports = router;