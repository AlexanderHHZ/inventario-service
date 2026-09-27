-- =====================================================
-- INVENTARIO SERVICE
-- Script de creación de base de datos
-- =====================================================

CREATE DATABASE IF NOT EXISTS tienda_online
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE tienda_online;


-- =====================================================
-- TABLA: proveedores
-- =====================================================

CREATE TABLE IF NOT EXISTS proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    razon_social VARCHAR(150),
    rfc VARCHAR(13)
);


-- =====================================================
-- TABLA: productos
-- =====================================================

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    lote VARCHAR(100),
    serie VARCHAR(100),
    caducidad DATE NULL,
    id_proveedor INT,
    costo DECIMAL(10,2) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_producto_proveedor
        FOREIGN KEY (id_proveedor)
        REFERENCES proveedores(id)
);


-- =====================================================
-- TABLA: stock
-- =====================================================

CREATE TABLE IF NOT EXISTS stock (
    id_producto INT PRIMARY KEY,
    stock_actual INT NOT NULL DEFAULT 0,
    stock_minimo INT NOT NULL DEFAULT 0,
    stock_maximo INT NOT NULL DEFAULT 0,

    CONSTRAINT fk_stock_producto
        FOREIGN KEY (id_producto)
        REFERENCES productos(id)
        ON DELETE CASCADE
);