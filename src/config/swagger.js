const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'API de Inventario',
            version: '1.0.0',
            description:
                'Microservicio #6 de la tienda en línea. Permite registrar, consultar, actualizar y eliminar productos.'
        },

        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            }
        ],

        components: {
            schemas: {
                Producto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        nombre: {
                            type: 'string',
                            example: 'Teclado mecanico RGB'
                        },
                        lote: {
                            type: 'string',
                            nullable: true,
                            example: 'LOT-001'
                        },
                        serie: {
                            type: 'string',
                            nullable: true,
                            example: 'TEC-001'
                        },
                        caducidad: {
                            type: 'string',
                            format: 'date',
                            nullable: true,
                            example: null
                        },
                        id_proveedor: {
                            type: 'integer',
                            nullable: true,
                            example: 1
                        },
                        costo: {
                            type: 'number',
                            format: 'double',
                            example: 700.00
                        },
                        precio: {
                            type: 'number',
                            format: 'double',
                            example: 999.00
                        }
                    }
                },

                ProductoEntrada: {
                    type: 'object',
                    required: [
                        'nombre',
                        'costo',
                        'precio'
                    ],
                    properties: {
                        nombre: {
                            type: 'string',
                            example: 'Teclado mecanico RGB'
                        },
                        lote: {
                            type: 'string',
                            nullable: true,
                            example: 'LOT-001'
                        },
                        serie: {
                            type: 'string',
                            nullable: true,
                            example: 'TEC-001'
                        },
                        caducidad: {
                            type: 'string',
                            format: 'date',
                            nullable: true,
                            example: null
                        },
                        id_proveedor: {
                            type: 'integer',
                            nullable: true,
                            example: 1
                        },
                        costo: {
                            type: 'number',
                            example: 700.00
                        },
                        precio: {
                            type: 'number',
                            example: 999.00
                        }
                    }
                }
            }
        }
    },

    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;