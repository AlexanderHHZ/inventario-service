const productoService = require('../services/producto.service');


const obtenerProductos = async (req, res) => {
    try {
        const productos = await productoService.obtenerTodos();

        return res.status(200).json({
            success: true,
            message: 'Lista de productos',
            data: productos
        });

    } catch (error) {
        console.error('Error al consultar productos:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};


const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await productoService.obtenerPorId(id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Producto encontrado',
            data: producto
        });

    } catch (error) {
        console.error('Error al consultar producto:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};


const crearProducto = async (req, res) => {
    try {
        const {
            nombre,
            id_proveedor,
            costo,
            precio
        } = req.body;

        if (!nombre || costo === undefined || precio === undefined) {
            return res.status(400).json({
                success: false,
                message: 'nombre, costo y precio son obligatorios'
            });
        }

        if (Number(costo) < 0 || Number(precio) < 0) {
            return res.status(400).json({
                success: false,
                message: 'costo y precio no pueden ser negativos'
            });
        }

        if (id_proveedor !== null && id_proveedor !== undefined) {
            const existe = await productoService.proveedorExiste(id_proveedor);

            if (!existe) {
                return res.status(400).json({
                    success: false,
                    message: 'El proveedor especificado no existe'
                });
            }
        }

        const productoCreado = await productoService.crear(req.body);

        return res.status(201).json({
            success: true,
            message: 'Producto registrado correctamente',
            data: productoCreado
        });

    } catch (error) {
        console.error('Error al registrar producto:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};


const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nombre,
            id_proveedor,
            costo,
            precio
        } = req.body;

        const productoExistente = await productoService.obtenerPorId(id);

        if (!productoExistente) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        if (!nombre || costo === undefined || precio === undefined) {
            return res.status(400).json({
                success: false,
                message: 'nombre, costo y precio son obligatorios'
            });
        }

        if (Number(costo) < 0 || Number(precio) < 0) {
            return res.status(400).json({
                success: false,
                message: 'costo y precio no pueden ser negativos'
            });
        }

        if (id_proveedor !== null && id_proveedor !== undefined) {
            const existe = await productoService.proveedorExiste(id_proveedor);

            if (!existe) {
                return res.status(400).json({
                    success: false,
                    message: 'El proveedor especificado no existe'
                });
            }
        }

        const productoActualizado =
            await productoService.actualizar(id, req.body);

        return res.status(200).json({
            success: true,
            message: 'Producto actualizado correctamente',
            data: productoActualizado
        });

    } catch (error) {
        console.error('Error al actualizar producto:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};


const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const filasEliminadas = await productoService.eliminar(id);

        if (filasEliminadas === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Producto eliminado correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar producto:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};


module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};