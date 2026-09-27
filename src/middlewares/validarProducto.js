const validarId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: 'El ID debe ser un número entero positivo'
        });
    }

    next();
};


const validarProducto = (req, res, next) => {
    const {
        nombre,
        lote,
        serie,
        caducidad,
        id_proveedor,
        costo,
        precio
    } = req.body;

    // Nombre obligatorio
    if (
        typeof nombre !== 'string' ||
        nombre.trim().length === 0
    ) {
        return res.status(400).json({
            success: false,
            message: 'El nombre es obligatorio'
        });
    }

    // Costo obligatorio y válido
    if (
        costo === undefined ||
        costo === null ||
        costo === '' ||
        !Number.isFinite(Number(costo)) ||
        Number(costo) < 0
    ) {
        return res.status(400).json({
            success: false,
            message: 'El costo debe ser un número mayor o igual a 0'
        });
    }

    // Precio obligatorio y válido
    if (
        precio === undefined ||
        precio === null ||
        precio === '' ||
        !Number.isFinite(Number(precio)) ||
        Number(precio) < 0
    ) {
        return res.status(400).json({
            success: false,
            message: 'El precio debe ser un número mayor o igual a 0'
        });
    }

    // Proveedor opcional, pero si existe debe ser un ID válido
    if (
        id_proveedor !== undefined &&
        id_proveedor !== null &&
        (
            !Number.isInteger(Number(id_proveedor)) ||
            Number(id_proveedor) <= 0
        )
    ) {
        return res.status(400).json({
            success: false,
            message: 'id_proveedor debe ser un número entero positivo'
        });
    }

    // Lote opcional
    if (
        lote !== undefined &&
        lote !== null &&
        typeof lote !== 'string'
    ) {
        return res.status(400).json({
            success: false,
            message: 'lote debe ser una cadena de texto'
        });
    }

    // Serie opcional
    if (
        serie !== undefined &&
        serie !== null &&
        typeof serie !== 'string'
    ) {
        return res.status(400).json({
            success: false,
            message: 'serie debe ser una cadena de texto'
        });
    }

    // Caducidad opcional
    if (
        caducidad !== undefined &&
        caducidad !== null &&
        caducidad !== ''
    ) {
        const fecha = new Date(caducidad);

        if (Number.isNaN(fecha.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'caducidad debe contener una fecha válida'
            });
        }
    }

    // Normalizamos algunos datos antes de enviarlos al controller
    req.body.nombre = nombre.trim();

    next();
};


module.exports = {
    validarId,
    validarProducto
};