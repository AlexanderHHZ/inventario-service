const rutaNoEncontrada = (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
};


const manejarErrores = (error, req, res, next) => {

    // Error producido cuando el cliente envía JSON mal formado
    if (
        error instanceof SyntaxError &&
        error.status === 400 &&
        'body' in error
    ) {
        return res.status(400).json({
            success: false,
            message: 'JSON inválido o mal formado'
        });
    }

    // Cualquier otro error inesperado
    console.error('Error no controlado:', error);

    return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
};


module.exports = {
    rutaNoEncontrada,
    manejarErrores
};