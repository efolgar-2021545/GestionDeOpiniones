'use strict';

import { randomUUID } from 'crypto';

/**
 * Middleware global para el manejo de errores (Compatible con PostgreSQL)
 */
export const serverGenericErrorHandler = (err, req, res, _next) => {
    console.error('Error:', err);
    const traceId = err.traceId || randomUUID();
    const timestamp = new Date().toISOString();
    const errorCode = err.errorCode || null;

    // Error de llave foránea o violación de restricción en PostgreSQL (Sequelize)
    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({
            success: false,
            message: 'Error de relación: El ID de referencia no existe',
            errorCode,
            traceId,
            timestamp,
        });
    }

    // Error de validación de Sequelize (Campos únicos o vacíos)
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            success: false,
            message: err.errors ? err.errors[0].message : 'Error de validación en la base de datos',
            errorCode,
            traceId,
            timestamp,
        });
    }

    // Error de JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Token inválido',
            errorCode,
            traceId,
            timestamp,
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expirado',
            errorCode,
            traceId,
            timestamp,
        });
    }

    // Error personalizado con status
    if (err.status) {
        return res.status(err.status).json({
            success: false,
            message: err.message || 'Error del servidor',
            errorCode: err.errorCode || null,
            traceId,
            timestamp,
        });
    }

    // Error genérico del servidor
    return res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        errorCode,
        traceId,
        timestamp,
    });
};

/**
 * Middleware para manejar rutas no encontradas
 */
export const notFound = (req, res) => {
    const traceId = randomUUID();
    const timestamp = new Date().toISOString();
    res.status(404).json({
        success: false,
        message: `Ruta ${req.originalUrl} no encontrada`,
        errorCode: null,
        traceId,
        timestamp,
    });
};

/**
 * Wrapper para manejar errores en funciones asíncronas
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};